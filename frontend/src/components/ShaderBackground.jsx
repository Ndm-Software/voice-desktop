import { useEffect, useRef } from "react";

function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (!gl) {
      console.error("WebGL desteklenmiyor.");
      return;
    }

    let animationFrameId;
    let resizeObserver;

    // =========================
    // VERTEX SHADER
    // =========================

    const vertexShaderSource = `
      attribute vec2 a_position;

      varying vec2 v_texCoord;

      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // =========================
    // FRAGMENT SHADER
    // =========================

    const fragmentShaderSource = `
      precision highp float;

      varying vec2 v_texCoord;

      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {

        vec2 uv = v_texCoord;

        vec2 centered_uv = uv * 2.0 - 1.0;

        centered_uv.x *=
          u_resolution.x / u_resolution.y;

        // =========================
        // HAREKETLİ YEŞİL DALGA
        // =========================

        float wave = 0.0;

        wave +=
          sin(centered_uv.x * 2.2 + u_time * 0.8)
          * 0.075;

        wave +=
          sin(centered_uv.x * 4.0 - u_time * 0.5)
          * 0.035;

        wave +=
          sin(centered_uv.x * 6.0 + u_time * 0.3)
          * 0.018;

        float waveY = wave + 0.02;

        float distanceFromWave =
          abs(centered_uv.y - waveY);

        // Ana glow
        float glow =
          exp(-distanceFromWave * 38.0);

        // Geniş yumuşak glow
        float softGlow =
          exp(-distanceFromWave * 5.5);

        // =========================
        // RENKLER
        // =========================

        vec3 backgroundColor =
          vec3(0.985, 0.99, 0.985);

        vec3 green =
          vec3(0.05, 0.48, 0.39);

        vec3 lightGreen =
          vec3(0.28, 0.72, 0.63);

        vec3 color =
          mix(
            backgroundColor,
            green,
            glow * 0.38
          );

        color =
          mix(
            color,
            lightGreen,
            softGlow * 0.12
          );

        // =========================
        // ALT YEŞİL ALAN
        // =========================

        float bottom =
          smoothstep(
            0.72,
            0.05,
            uv.y
          );

        color =
          mix(
            color,
            vec3(0.78, 0.94, 0.89),
            bottom * 0.18
          );

        gl_FragColor =
          vec4(color, 1.0);
      }
    `;

    // =========================
    // SHADER OLUŞTUR
    // =========================

    function createShader(type, source) {
      const shader = gl.createShader(type);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    const vertexShader = createShader(
      gl.VERTEX_SHADER,
      vertexShaderSource
    );

    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) {
      return;
    }

    // =========================
    // PROGRAM
    // =========================

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // =========================
    // FULL SCREEN QUAD
    // =========================

    const buffer = gl.createBuffer();

    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffer
    );

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,

        -1,  1,
         1, -1,
         1,  1
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation =
      gl.getAttribLocation(
        program,
        "a_position"
      );

    gl.enableVertexAttribArray(
      positionLocation
    );

    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    // =========================
    // UNIFORMS
    // =========================

    const timeLocation =
      gl.getUniformLocation(
        program,
        "u_time"
      );

    const resolutionLocation =
      gl.getUniformLocation(
        program,
        "u_resolution"
      );

    // =========================
    // RESIZE
    // =========================

    function syncSize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) return;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      const realWidth =
        Math.floor(width * dpr);

      const realHeight =
        Math.floor(height * dpr);

      if (
        canvas.width !== realWidth ||
        canvas.height !== realHeight
      ) {
        canvas.width = realWidth;
        canvas.height = realHeight;

        gl.viewport(
          0,
          0,
          realWidth,
          realHeight
        );
      }
    }

    syncSize();

    resizeObserver =
      new ResizeObserver(syncSize);

    resizeObserver.observe(canvas);

    // =========================
    // ANIMATION
    // =========================

    function render(time) {
      gl.useProgram(program);

      // Biraz daha hızlı animasyon
      gl.uniform1f(
        timeLocation,
        time * 0.0008
      );

      gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      animationFrameId =
        requestAnimationFrame(render);
    }

    animationFrameId =
      requestAnimationFrame(render);

    // =========================
    // CLEANUP
    // =========================

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="shader-background"
    />
  );
}

export default ShaderBackground;
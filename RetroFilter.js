// RetroFilter.js
import React from 'react';
import { Surface } from 'gl-react-native';
import { GLSL, Node, Shaders } from 'gl-react';

const shaders = Shaders.create({
  RetroFilter: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D children;

      void main () {
        vec3 col = texture2D(children, uv).rgb;

        // Add some retro effect by adjusting colors
        col = vec3(
          col.r * 0.393 + col.g * 0.769 + col.b * 0.189,
          col.r * 0.349 + col.g * 0.686 + col.b * 0.168,
          col.r * 0.272 + col.g * 0.534 + col.b * 0.131
        );

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  },
});

const RetroFilter = ({ children }) => {
  return (
    <Surface style={{ width: 100, height: 100 }}>
      <Node shader={shaders.RetroFilter} uniforms={{ children }} />
    </Surface>
  );
};

export default RetroFilter;

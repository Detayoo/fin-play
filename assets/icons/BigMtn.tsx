import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const BigMtn = (props: SvgProps) => (
  <Svg width={70} height={70} fill="none" {...props}>
    <G filter="url(#a)">
      <Rect
        width={62}
        height={62}
        x={4}
        y={2}
        fill="url(#b)"
        rx={31}
        // shapeRendering="crispEdges"
      />
    </G>
    <Defs>
      <Pattern
        id="b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#c" transform="matrix(.00676 0 0 .00676 -.068 0)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="c"
        width={168}
        height={148}
      />
    </Defs>
  </Svg>
);
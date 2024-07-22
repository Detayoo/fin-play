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
export const Airtel = (props: SvgProps) => (
  <Svg width={53} height={53} fill="none" {...props}>
    <G filter="url(#a)">
      <Rect width={53} height={53} fill="#fff" rx={26.5} ry={26.5} />
      <Rect width={53} height={53} fill="url(#b)" rx={26.5} ry={26.5} />
    </G>
    <Defs>
      <Pattern
        id="b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#c" transform="matrix(.00464 0 0 .00433 -.035 .003)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="c"
        width={223}
        height={226}
      />
    </Defs>
  </Svg>
);

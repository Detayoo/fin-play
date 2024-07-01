import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

import { Colors } from "@/constants";
export const Fingerprint = (props: SvgProps) => {
  return (
    <Svg width={60} height={60} fill="none" {...props}>
      <Circle cx={31} cy={30} r={29} fill={Colors.checkboxBorder} />
      <Circle cx={27.5} cy={27.5} r={27.5} fill={Colors.primary} />
      <Path
        fill="#fff"
        d="M18.323 13.82a.597.597 0 0 0 .844.013 13.046 13.046 0 0 1 8.165-3.642.597.597 0 0 0 .554-.636.603.603 0 0 0-.637-.554 14.246 14.246 0 0 0-8.913 3.976.596.596 0 0 0-.013.843ZM29.08 9.575a.597.597 0 0 0 .532.655c3.047.315 5.9 1.708 8.035 3.922a.595.595 0 1 0 .859-.828 14.244 14.244 0 0 0-8.77-4.28.592.592 0 0 0-.656.531ZM14 24.195a.596.596 0 1 0 1.194 0v-.986c-.001-2.772.856-5.419 2.479-7.655a.596.596 0 1 0-.967-.7A14.133 14.133 0 0 0 14 23.209v.986Zm26.07-8.938a.596.596 0 1 0-.99.666c2.741 4.066 2.134 7.994 2.221 8.743a.597.597 0 0 0 1.194 0c-.088-.743.569-4.969-2.425-9.409Z"
      />
      <Path
        fill="#fff"
        d="M42.423 27.78a.596.596 0 0 0-.242-.808 3.96 3.96 0 0 1-2.073-3.483c0-6.486-5.16-12.136-11.863-12.136-6.539 0-11.858 5.318-11.858 11.856a4.261 4.261 0 0 1-2.093 3.655.596.596 0 1 0 .606 1.028 5.46 5.46 0 0 0 2.68-4.683c0-5.88 4.784-10.664 10.665-10.664 6.03 0 10.67 5.091 10.67 10.944a5.154 5.154 0 0 0 2.7 4.533.597.597 0 0 0 .808-.242Z"
      />
      <Path
        fill="#fff"
        d="M36.68 20.587a.596.596 0 0 0 .334-.776c-1.318-3.296-4.238-5.598-7.623-6.007a.596.596 0 1 0-.143 1.184c2.95.357 5.502 2.375 6.657 5.266.12.299.461.457.776.332Zm4.71 9.951a.597.597 0 0 0 .425-1.114 6.386 6.386 0 0 1-4.094-5.935c0-.408-.026-.821-.076-1.227a.596.596 0 0 0-.666-.518c-.75.093-.451.873-.451 1.745a7.585 7.585 0 0 0 4.862 7.05ZM19.34 19.983a.596.596 0 1 0 1.122.407 8.275 8.275 0 0 1 6.566-5.37.597.597 0 1 0-.175-1.18 9.465 9.465 0 0 0-7.512 6.143Zm-4.54 10.58a7.838 7.838 0 0 0 5.168-7.354c0-.22.008-.437.025-.652a.596.596 0 0 0-1.19-.09 9.77 9.77 0 0 0-.029.742 6.642 6.642 0 0 1-4.38 6.232.597.597 0 1 0 .405 1.123Zm26.994 4.793a.598.598 0 0 0-.78.321 29.922 29.922 0 0 1-4.066 6.959.596.596 0 1 0 .938.736 31.106 31.106 0 0 0 4.23-7.236.596.596 0 0 0-.322-.78Zm-6.777 5.821a27.835 27.835 0 0 1-4.688 4.674.596.596 0 1 0 .737.938 29.066 29.066 0 0 0 4.89-4.875.596.596 0 1 0-.94-.737Zm1.536-1.069a.597.597 0 0 0 .826-.17 29.836 29.836 0 0 0 3.587-7.698.597.597 0 0 0-1.142-.348 28.634 28.634 0 0 1-3.443 7.39.596.596 0 0 0 .172.826Zm-9.91 6.806c6.04-3.635 10.259-9.156 12.201-15.967a.596.596 0 1 0-1.148-.327c-1.857 6.515-5.892 11.796-11.669 15.273a.595.595 0 1 0 .616 1.021Z"
      />
      <Path
        fill="#fff"
        d="M32.377 36.571a23.307 23.307 0 0 1-4.203 4.797.596.596 0 1 0 .782.9 24.505 24.505 0 0 0 4.418-5.042.597.597 0 0 0-.997-.655Zm-9.127 9.456a26.947 26.947 0 0 0 3.786-2.248.596.596 0 1 0-.692-.971 25.73 25.73 0 0 1-3.619 2.147.596.596 0 1 0 .525 1.072Zm10.557-10.655a.597.597 0 0 0 .806-.252 26.355 26.355 0 0 0 2.306-6.284.596.596 0 1 0-1.163-.268 25.15 25.15 0 0 1-2.2 5.999.596.596 0 0 0 .251.805Z"
      />
      <Path
        fill="#fff"
        d="M20.587 44.582c8.767-3.576 14.118-11.262 14.68-21.087.025-.412.01-.85-.044-1.3a.58.58 0 0 0-.014-.072l-.007-.032c-.667-3.545-3.77-6.18-7.284-5.96-3.553.207-6.342 3.102-6.546 6.547-.303 4.884-2.93 8.04-6.962 9.37a.596.596 0 1 0 .374 1.133c4.551-1.502 7.45-5.117 7.779-10.431.16-2.685 2.202-4.943 4.847-5.367 3.375-.48 6.06 1.931 6.621 4.94l.01.041v.003c.044.37.055.725.036 1.059-.537 9.348-5.618 16.657-13.94 20.052a.596.596 0 1 0 .45 1.104Z"
      />
      <Path
        fill="#fff"
        d="M23.165 27.984c.305.12.652-.03.773-.338.568-1.45.906-3.05 1.005-4.753a3.417 3.417 0 0 1 2.4-3.049.596.596 0 0 0 .395-.745c-.374-1.235-3.794.603-3.986 3.723-.092 1.579-.403 3.056-.926 4.39a.597.597 0 0 0 .339.772Zm1.288 10.967a.597.597 0 0 0-.833-.132 21.327 21.327 0 0 1-5.514 2.864.596.596 0 1 0 .394 1.126 22.512 22.512 0 0 0 5.822-3.025.596.596 0 0 0 .131-.833Zm7.801-11.21c.294-1.245.797-4.094.573-5.354-.364-1.706-1.558-3.102-3.118-3.644a.596.596 0 1 0-.391 1.127c1.167.406 2.064 1.465 2.338 2.745.176 1.006-.327 3.85-.564 4.851a.596.596 0 0 0 1.162.274Zm-10.446 1.503c-1.467 2.37-3.982 4.32-7.2 5.23a.597.597 0 0 0 .325 1.148c3.529-1 6.27-3.14 7.89-5.749a.597.597 0 1 0-1.015-.629Zm9.392.084a.597.597 0 0 0-.762.362c-1.059 2.977-2.75 5.554-5.028 7.66a.596.596 0 1 0 .811.876c2.42-2.239 4.218-4.976 5.341-8.136a.597.597 0 0 0-.362-.762Z"
      />
      <Path
        fill="#fff"
        d="M15.506 37.93c6.954-1.972 11.373-7.537 11.819-14.886.034-.54.457-.955.992-.962.273 0 .528.11.716.31.195.205.292.475.276.759-.463 8.04-5.22 14.223-12.727 16.54a.596.596 0 1 0 .352 1.14c8.002-2.47 13.074-9.054 13.566-17.611a2.218 2.218 0 0 0-.598-1.646 2.177 2.177 0 0 0-1.612-.685c-1.155.016-2.082.91-2.156 2.081-.414 6.822-4.51 11.985-10.954 13.812a.596.596 0 1 0 .326 1.148Z"
      />
    </Svg>
  );
};

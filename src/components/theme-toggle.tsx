"use client";
import { useTheme } from "next-themes";

export default function ThemeToogle() {
  const { theme, setTheme } = useTheme();

  const handleclick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div className="w-12 pt-0.5">
      <label className="my-auto" id="theme-toggle-button">
        <input
          type="checkbox"
          className="absolute opacity-100"
          id="toggle"
          checked={theme === "dark" ? true : false}
          onChange={handleclick}
        />
        <svg
          // onClick={handleclick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 69.667 44"
        >
          <g data-name="Component 15 – 1" transform="translate(3.5 3.5)">
            <g filter="url(#container)" transform="translate(-3.5 -3.5)">
              <rect
                id="container"
                width="60.667"
                height="35"
                fill="#83cbd8"
                data-name="container"
                rx="17.5"
                transform="translate(3.5 3.5)"
              ></rect>
            </g>
            <g transform="translate(2.333 2.333)" id="button">
              <g id="sun" data-name="sun">
                <g filter="url(#sun-outer)" transform="translate(-5.83 -5.83)">
                  <circle
                    cx="15.167"
                    cy="15.167"
                    r="15.167"
                    fill="#f8e664"
                    data-name="sun-outer"
                    transform="translate(5.83 5.83)"
                  ></circle>
                </g>
                <g filter="url(#sun)" transform="translate(-5.83 -5.83)">
                  <path
                    fill="rgba(246,254,247,0.29)"
                    d="M11.667 0A11.667 11.667 0 110 11.667 11.667 11.667 0 0111.667 0z"
                    data-name="sun"
                    transform="translate(9.33 9.33)"
                  ></path>
                </g>
                <circle
                  cx="7"
                  cy="7"
                  r="7"
                  fill="#fcf4b9"
                  transform="translate(8.167 8.167)"
                ></circle>
              </g>
              <g id="moon" data-name="moon">
                <g filter="url(#moon)" transform="translate(-31.5 -5.83)">
                  <circle
                    cx="15.167"
                    cy="15.167"
                    r="15.167"
                    fill="#cce6ee"
                    data-name="moon"
                    transform="translate(31.5 5.83)"
                  ></circle>
                </g>
                <g fill="#a6cad0" transform="translate(-24.415 -1.009)">
                  <circle
                    cx="2"
                    cy="2"
                    r="2"
                    transform="translate(43.009 4.496)"
                  ></circle>
                  <circle
                    cx="2"
                    cy="2"
                    r="2"
                    data-name="patch"
                    transform="translate(39.366 17.952)"
                  ></circle>
                  <circle
                    cx="1"
                    cy="1"
                    r="1"
                    data-name="patch"
                    transform="translate(33.016 8.044)"
                  ></circle>
                  <circle
                    cx="1"
                    cy="1"
                    r="1"
                    data-name="patch"
                    transform="translate(51.081 18.888)"
                  ></circle>
                  <circle
                    cx="1"
                    cy="1"
                    r="1"
                    data-name="patch"
                    transform="translate(33.016 22.503)"
                  ></circle>
                  <circle
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    data-name="patch"
                    transform="translate(50.081 10.53)"
                  ></circle>
                </g>
              </g>
            </g>
            <g filter="url(#cloud)" transform="translate(-3.5 -3.5)">
              <path
                id="cloud"
                fill="#fff"
                d="M3512.81 173.815a4.463 4.463 0 012.243.62.95.95 0 01.72-1.281 4.852 4.852 0 012.623.519c.034.02-.5-1.968.281-2.716a2.117 2.117 0 012.829-.274 1.821 1.821 0 01.854 1.858c.063.037 2.594-.049 3.285 1.273s-.865 2.544-.807 2.626a12.192 12.192 0 012.278.892c.553.448 1.106 1.992-1.62 2.927a7.742 7.742 0 01-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417 2.2-2.623 2.2a4.172 4.172 0 01-2.394-1.206 3.825 3.825 0 01-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55a3.721 3.721 0 012.201-1.738z"
                data-name="cloud"
                transform="translate(-3466.47 -160.94)"
              ></path>
            </g>
            <g fill="#def8ff">
              <path
                d="M.774 0L.566.559 0 .539l.458.394-.208.559.485-.361.458.394-.169-.572.485-.361-.566-.02z"
                transform="translate(3.585 1.325) rotate(180 12.102 1.63)"
              ></path>
              <path
                d="M1.341.529L.836.472.736 0 .505.46 0 .4l.4.329-.231.46.436-.257.4.326L.9.786z"
                data-name="star"
                transform="translate(3.585 1.325) scale(-1) rotate(-39 -29.055 26.574)"
              ></path>
              <path
                d="M.015 1.065L.475.9l.285.365.006-.493.46-.164L.745.494.751 0l-.27.407L0 .293l.285.365z"
                data-name="star"
                transform="translate(3.585 1.325) rotate(64.02 -12.194 33.404)"
              ></path>
              <path
                d="M1.161 1.6L1.059 1l.515-.278L.962.607.86 0 .613.572 0 .457l.446.424-.246.573.516-.274z"
                data-name="star"
                transform="translate(3.585 1.325) rotate(104 6.187 5.146)"
              ></path>
              <path
                d="M.873 1.648l.114-.62.592-.083L1.03.62 1.144 0 .706.464.157.139.438.7 0 1.167l.592-.083z"
                data-name="star"
                transform="translate(3.585 1.325) scale(-1) rotate(-85.99 -13.816 -1.793)"
              ></path>
              <path
                d="M.593 0l.045.724L0 .982l.7.211.045.724.36-.64.7.211-.463-.553L1.7.294l-.637.258z"
                data-name="star"
                transform="translate(3.585 1.325) rotate(11 -141.55 57.265)"
              ></path>
              <path
                d="M.816 0L.5.455 0 .311l.323.456-.312.455.516-.215.323.456L.827.911 1.343.7.839.552z"
                data-name="star"
                transform="translate(3.585 1.325) rotate(172 2.298 3.156)"
              ></path>
              <path
                d="M1.261 0L.774.571.114.3l.373.667L0 1.538l.728-.218.372.662.047-.749.728-.218-.66-.266z"
                data-name="star"
                transform="translate(3.585 1.325) rotate(169 .405 7.415)"
              ></path>
            </g>
          </g>
        </svg>
      </label>
    </div>
  );
}

const colors = {
  primary: "var(--primaryColor)",
  secondary: "var(--secondaryColor)",
  link: "var(--linkColor)",
  success: "var(--successColor)",
  warning: "var(--warningColor)",
  error: "var(--errorColor)",
  heading: "var(--headingColor)",
  subheading: "var(--subHeadingColor)",
  "primary-text": "var(--primaryTextColor)",
  "seondary-text": "var(--secondaryTextColor)",
  disabled: "var(--disabledColor)",
  form: "var(--formItemBackgroundColor)",
  border: "var(--borderColor)",
  button: "var(--buttonTextColor)",
  "primary-bg": "var(--primaryBackgroundColor)",
  "gray-light": "var(--secondaryBackgroundColor)",
  "deep-blue": "var(--deepBlueColor)",
  "gray-01": "var(--grayColor01)",

  // 辅助色
  "secondary-01": `var(--secondaryColor_01)`,
  "secondary-02": `var(--secondaryColor_02)`,
  "secondary-03": `var(--secondaryColor_03)`,
  "secondary-04": `var(--secondaryColor_04)`,
  "secondary-05": `var(--secondaryColor_05)`,
  "secondary-06": `var(--secondaryColor_06)`,
  "secondary-07": `var(--secondaryColor_07)`,
  "secondary-08": `var(--secondaryColor_08)`,
};

// 在prod打包时颜色统一转换为rgba
const NODE_ENV = process.env.NODE_ENV;
for (let key in colors) {
  ~(function () {
    var temp = colors[key];
    colors[key] = ({ opacityVariable, opacityValue }) => {
      if (!NODE_ENV || NODE_ENV != "development") {
        if (typeof opacityValue != "undefined") {
          return `rgba(${temp}, ${opacityValue})`;
        }
        if (typeof opacityVariable != "undefined") {
          return `rgba(${temp}, var(${opacityVariable}))`;
        }
        return `rgb(${temp})`;
      } else {
        return temp;
      }
    };
  })();
}

const safePrefixList = [
  "mt",
  "mb",
  "mr",
  "ml",
  "pt",
  "pb",
  "pr",
  "pl",
  "p",
  "m",
  "w",
  "min-w",
  "max-w",
  "h",
  "min-h",
  "max-h",
  "text",
  "font",
  "leading",
  "break",
  "grid",
  "gap",
  "flex",
  "justify",
  // "content",
  "items",
  "self",
  // "place",
  // "order",
  "bg",
  "rounded",
  "border",
  "inline",
  // "float",
  "overflow",
  "top",
  "bottom",
  "left",
  "right",
  "z",
  "whitespace",
  "shadow",
  "opacity",
];
let safePrefixs = safePrefixList.reduce((acc, cur) => {
  const list = [];
  list.push(cur);
  list.push(`sm:${cur}`);
  list.push(`md:${cur}`);
  list.push(`lg:${cur}`);
  list.push(`xl:${cur}`);
  list.push(`2xl:${cur}`);
  list.push(`hover:${cur}`);
  return acc.concat(list);
}, []);
const classNames = new RegExp(`^(${safePrefixs.join("|")})-`);

const safePrefixList2 = ["justify", "flex", "grid", "col-span"];
let safePrefixs2 = safePrefixList2.reduce((acc, cur) => {
  const list = [];
  list.push(cur);
  list.push(`sm:${cur}`);
  list.push(`md:${cur}`);
  list.push(`lg:${cur}`);
  list.push(`xl:${cur}`);
  list.push(`2xl:${cur}`);
  list.push(`hover:${cur}`);
  return acc.concat(list);
}, []);
const classNames2 = new RegExp(`^(${safePrefixs2.join("|")})-`);

// theme-common (*.html,*.json) tailwindcss chunk
const minimist = require("minimist");
const argv = minimist(process.argv.slice(2));
let autoMergeCommon = false;
if (argv.autoMergeCommon) {
  autoMergeCommon = true;
}
let content = ["./src/**/*.html", "./src/**/*.json", "./src/**/*.tsx", "./src/**/*.ts"];
if (autoMergeCommon) {
  content.unshift("../theme-common/**/*.html", "../theme-common/**/*.json");
}

module.exports = {
  content: {
    layers: ["components", "utilities"],
    content: content,
    options: {
      safelist: [
        /^(text-left|sm:text-left|md:text-left|lg:text-left|xl:text-left|2xl:text-left)/,
      ],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      fontFamily: {
        hazard: ["Hazard", "Arial", "Helvetica", "sans-serif"],
      },
      colors: { ...colors, "dark-blue": "#4E6999" },
      backgroundColor: {
        button: "#7abc31",
      },
      inset: {
        "50px": "50px",
        "60px": "60px",
        "70px": "70px",
        "80px": "80px",
        "90px": "90px",
        "100px": "100px",
      },
      margin: {
        "50px": "50px",
        "60px": "60px",
        "70px": "70px",
        "80px": "80px",
        "90px": "90px",
        "100px": "100px",
        "50px-": "-50px",
        "60px-": "-60px",
        "70px-": "-70px",
        "80px-": "-80px",
        "90px-": "-90px",
        "100px-": "-100px",
      },
      padding: {
        "25p": "25%",
        "30p": "30%",
        "35p": "35%",
        "40p": "40%",
        "45p": "45%",
        "50p": "50%",
        "56p": "56.25%",
        "66p": "66.6%",
      },
      width: {
        "80px": "80px",
        "100px": "100px",
        "180px": "180px",
        "200px": "200px",
        "210px": "210px",
        "250px": "250px",
        "408px": "408px",
        "448px": "448px",
        "800px": "800px",
        "1200px": "1200px",
        "9/20": "45%",
      },
      height: {
        "80px": "80px",
        "100px": "100px",
        "180px": "180px",
        "200px": "200px",
        "250px": "250px",
        "210px": "210px",
        "800px": "800px",
        "1200px": "1200px",
      },
      borderRadius: {
        none: "0",
        sm: "8px",
        DEFAULT: "3px",
        md: "8px",
        lg: "8px",
        full: "9999px",
        large: "8px",
      },
      boxShadow: {
        DEFAULT: "0 0 8px 0px rgba(0,0,0,0.16)",
        sm: "0 0 8px 0px rgba(0,0,0,0.16)",
        md: "0 0 8px 0px rgba(0,0,0,0.16)",
        lg: "0 0 8px 0px rgba(0,0,0,0.16)",
        xl: "0 0 8px 0px rgba(0,0,0,0.16)",
        "2xl": "0 0 8px 0px rgba(0,0,0,0.16)",
        "3xl": "0 0 8px 0px rgba(0,0,0,0.16)",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
    },
  },
};

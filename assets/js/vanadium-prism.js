Prism.languages.vanadium = {
  keyword: /\b(fn|if|else|return|mut|imut|include|publ|priv|shared|frozen)\b/,
  type: /\b(int16|int32|int64|uint8|uint16|uint32|uint64|float16|float32|float64|type|void|bool|str)\b/,
  boolean: /\b(?:false|true)\b/,

  number: /\b\d+(\.\d+)?\b/,

  string: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/,

  function: {
    pattern: /\b\w+(?=\()/,
    alias: "variable",
  },

  operator: /[-+*/%=!<>]=?/,

  comment: /@.*/,

  variable: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/,
};

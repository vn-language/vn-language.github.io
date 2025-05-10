Prism.languages.vanadium = {
  comment: {
    pattern: /@.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true,
  },

  keyword:
    /\b(fn|if|else|return|for|while|include|unsafe|struct|new|mut|imut)\b/,
  boolean: /\b(?:false|true)\b/,

  weak_keyword: {
    pattern: /\b(in|as|frozen|publ|priv|shared)\b/,
    alias: "boolean",
  },

  number: [/\b\d+(\.\d+)?\b/, /\b0x[0-9a-fA-F]+\b/, /\b0b[01]+\b/],

  string: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/,

  function: {
    pattern: /\b\w+(?=\()/,
    alias: "property",
  },

  type: {
    pattern:
      /\b(int16|int32|int64|uint8|uint16|uint32|uint64|float16|float32|float64|type|void|bool|str)\b/,
    alias: "property",
  },

  special: { pattern: /\b(std|io|self)\b/, alias: "property" },

  operator: /[-+*/%=!<>]=?/,

  variable: [/\b[a-zA-Z_][a-zA-Z0-9_]*\b/],
};

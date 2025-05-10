---
title: Vanadium
layout: index.html
vanadium_desc: "Vanadium is a lightweight high-level systems language designed for clarity, safety, and reliability."
---
Vanadium is a strictly typed, high-level systems programming language with **strong memory management**, **strict semantics** and **C interoperability**. Designed as a *stricter but more modern and less painful* alternative of C/C++, Vanadium provides **raw power and performance** with **explicitness and transparency** while also implementing a [**rich standard library**](/ref/) with helpers, macros and abstraction of more complex systems.

### Examples:

<details>
<summary>Hello, World!</summary>

```vanadium
include std::io;

frozen fn main() {
    io::print("Hello, World!");
}
```

</details>

<details>
<summary>Iterate over an array</summary>

```vanadium
include std::io;

frozen fn main() {
    imut names: str[] = ["Jhon", "Tom", "Angela", "Luca"];
    for name in names {
        io::print("Hello, " + name + "!");
    }
}
```

</details>

<details>
<summary>Unsafe casting</summary>

```vanadium
frozen fn main() {
    imut long_int: int64 = 0xFFFFF;
    imut to_short: int16 = unsafe { long_int as int16 };
    unsafe {
        imut to_short_float: float16 = long_int as float16;
    };
}
```

</details>

<details>
<summary>Create a Vector2 structure</summary>

```vanadium
struct Vector2 {
    x: float32,
    y: float32,

    frozen fn Vector2(self: *Vector2, x: float32, y: float32) {
        self.x = x;
        self.y = y;
    }
}

frozen fn main() {
    imut my_vec = new Vector2(0.6, 4.7);
}
```

</details>

<details>
<summary>Import another file</summary>

File `math.vn`:
```vanadium
publ frozen fn add(a: int32, b: int32): int32 {
    a + b
}
```

File `main.vn`:
```vanadium
include std::io;
include math;

frozen fn main() {
    io::print(math::add(5, 5));
}
```

</details>

<details>
<summary>Use shared variables</summary>

File `config.vn`:
```vanadium
struct Config {
    secrets: str{str}, @ Map with string keys and string values
}

shared mut conf = new Config;
```

File `secrets.vn`:
```vanadium
include config;

publ frozen fn init_secrets() { 
    config::conf.secrets = {"PASSW" = "passivationisthebest123"};
}
```

File `main.vn`:
```vanadium
include std::io;
include config;
include secrets;

frozen fn main() {
    secrets::init_secrets();
    io::print(config::conf.secrets); @ {"PASSW" = "passivationisthebest123"}
}
```

</details>

[Get started](/docs/)


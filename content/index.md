---
title: Vanadium
layout: index.html
vanadium_desc: "Vanadium is a lightweight high-level systems language designed for clarity, safety, and reliability."
---
Vanadium is a robust programming language built with expressiveness and safety in mind. It blends low-level paradigms like manual memory management and bit-sized integers with high-level features, backed by a powerful unsafe system for when full control is needed.

Vanadium gives you what you expect from C++ — and then some:

- Interfaces
- `defer` and memory management helpers
- Cleaner lambdas
- Simpler iteration
- Safer (but optional) casting
- Sealed classes
- A real module system
- Compile-time values
- Clean error handling (`try`, `guard`, etc.)
- Implicit type inference (without auto)

All this is packed in a language that prioritizes explicitness, transparency, and power, with a cleaner syntax and better tooling in mind.

Vanadium is fully open-source and non-profit. It is currently being developed in C++.

### Examples:

<details> 
<summary><strong>Hello, World!</strong></summary>

```vanadium
from "std/IO" include println;

static func main() {
    println("Hello, World!");
}
```

</details>

<details> 
<summary><strong>Iterate over an array</strong></summary>

```vanadium
from "std/IO" include println;

static func main() {
    let names = ["Jhon", "Tom", "Angela", "Luca"];
    for name in names {
        println("Hello, " + name + "!");
    }
}
```

</details>

<details> 
<summary><strong>Unsafe casting</strong></summary>

```vanadium
static func main() {
    let long_int: long = 0xFFFFF;

    @@ Unsafe narrowing cast
    let to_short: short = unsafe { long_int as short };

    unsafe {
        let to_float: float = long_int as float;
    };
}
```

</details>

<details> 
<summary><strong>Error handling</strong></summary>

```vanadium
from "std/IO" include println;
from "std/errors" include Exception;

func div(a: int, b: int): !int {
    return a / b unless b == 0 ifso throw new Exception("Can't divide by zero");
}

static func main() {
    let result = try div(5, 0) catch {|err|
        println("Error: " + err);
        return;
    };
    println("Result: " + result);
}
```
</details>

<details> 
<summary><strong>Create a Vector2 class</strong></summary>

```vanadium
class Vector2 {
    public x: float,
    public y: float,

    static func new(self: &Vector2, x: float, y: float) {
        self.x = x;
        self.y = y;
    }
}

static func main() {
    let my_vec = new Vector2(0.6, 4.7);
}
```

</details>

<details> 
<summary><strong>Import another file</strong></summary>

File `math.vn`:

```vanadium
export static func add(a: int, b: int): int {
    a + b
}
```


File `main.vn`:

```vanadium
from "std/IO" include println;
include "math";

static func main() {
    println(add(5, 5));
}
```

</details>

<details> 
<summary><strong>Use static variables</strong></summary>

File config.vn:

```vanadium
struct Config {
    public secrets: {string}string = {};
}

export static conf = new Config;
```

File secrets.vn:

```vanadium
include "config";

export static func init_secrets() {
    config.conf.secrets["PASSW"] = "passivationisthebest123";
}
```

File main.vn:

```vanadium
from "std/IO" include println;
include "config";
include "secrets";

static func main() {
    init_secrets();
    println(conf.secrets);
}
```

</details>

<details>
<summary>
<strong>Allocate, reference and free memory</strong></summary>

```vanadium
@@ Ignore this! Jump directly to main.
static func assert(condition: bool, message: string?)  {
    throw new Exception(message ifnot "Assertion failed!") unless condition;
}

static func main() {
    @/ Manually allocated array
    let arr = new [4]ulong;
    assert(arr[2] == 0);
    arr[2] = 0xFFFFF;
    defer delete arr;

    let num = 7;
    @/ Reference to variable "num"
    let ptr = &amp;num; @@ Referencing
    defer delete ptr;

    *ptr = 5;
    assert(num == 5);
}
```

</details>

[Get started](/docs/)


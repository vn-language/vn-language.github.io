---
title: Vanadium
layout: index.html
vanadium_desc: "Vanadium is a lightweight high-level systems language designed for clarity, safety, and reliability."
---
<!--Vanadium is a robust programming language built with expressiveness and safety in mind. It blends low-level paradigms like manual memory management and bit-sized integers with high-level features, backed by a powerful unsafe system for when full control is needed.-->
<!---->
<!--Vanadium gives you what you expect from C++ — and then some:-->
<!---->
<!--- Interfaces-->
<!--- `defer` and memory management helpers-->
<!--- Cleaner lambdas-->
<!--- Simpler iteration-->
<!--- Safer (but optional) casting-->
<!--- Sealed classes-->
<!--- A real module system-->
<!--- Compile-time values-->
<!--- Clean error handling (`try`, `guard`, etc.)-->
<!--- Implicit type inference (without auto)-->
<!---->
<!--All this is packed in a language that prioritizes explicitness, transparency, and power, with a cleaner syntax and better tooling in mind.-->
<!---->
<!--Vanadium is fully open-source and non-profit. It is currently being developed in C++.-->

Vanadium is a robust systems-level programming language built with expressiveness, safety and strictness in mind. It combines systems-level features, like manual memory management or bit-sized integers, with high-level features, like lambdas or a file-based module system. 

Vanadium is often thinked of as the safer, more expressive version of C++.

Some of its core features are:
- C interoperability
- Blocks as expressions
- Strong typing and weak casts
- Low overhead *(if you don't mess up a lot)*
- JIT-compilation
- Clean error handling
- Intuitive module system
- Simple iterators <small>*(yes, [that exists](https://preview.redd.it/just-do-for-loops-why-do-you-gotta-complicate-things-so-much-v0-ha3h3fd7a4ue1.png?width=640&crop=smart&auto=webp&s=64d0a896b143714a2db035a598a232462707238b))*</small>
- Sealed classes
- Lambdas

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
<summary><strong>Unsafe usage</strong></summary>

```vanadium
static func main() {
    let long_int: long = 0xFFFFF;

    @@ Unsafe narrowing cast
    let long_as_short: short = unsafe { long_int as short };

    unsafe {
        let to_float: float = long_int as float;
        discard long_to_short(long_int);
    };

    @* Compile error
    discard long_to_short(long_int); 
    *@
}

unsafe func long_to_short(n: long): short {
    return n as short;
}
```

</details>

<details> 
<summary><strong>Error handling</strong></summary>

```vanadium
from "std/IO" include println;
from "std/err" include Exception;

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

export static func sub(a: int, b: int): int {
    a - b
}
```


File `main.vn`:

```vanadium
from "std/IO" include println;
include "math";
from "math" include sub;

static func main() {
    println(math.add(5, 5));
    println(sub(6, 3));
}
```

</details>

<details> 
<summary><strong>Use static variables</strong></summary>

File `config.vn`:

```vanadium
struct Config {
    public secrets: {string}string = {};
}

export static conf = new Config;
```

File `secrets.vn`:

```vanadium
include "config";

export static func init_secrets() {
    config.conf.secrets["PASSW"] = "passivationisthebest123";
}
```

File `main.vn`:

```vanadium
from "std/IO" include println;
include "config";
include "secrets";

static func main() {
    secrets.init_secrets();
    println(config.conf.secrets);
}
```

</details>

<details>
<summary><strong>Allocate, reference and free memory</strong></summary>

```vanadium
static func main() {
    @@ Manually allocated array
    let arr = new [4]ulong;
    assert(arr[2] == 0);
    arr[2] = 0xFFFFF;
    defer delete arr;

    let num = 7;
    let ptr = &amp;num; @@ Referencing
    defer delete ptr;

    *ptr = 5; @@ Dereferencing
    assert(num == 5);
}

@@ Ignore this!
from "std/err" include Exception;
static func assert(condition: bool, message: string?)  {
    throw new Exception(message ifnot "Assertion failed!") unless condition;
}
```

</details>

[Get started](/docs/)


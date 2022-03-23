type EffectFn = {
  (): void;
  deps: Set<EffectFn>[];
};
type DataType = typeof data;

let activeEffect: EffectFn;
const buckets = new WeakMap<DataType, Map<keyof DataType, Set<EffectFn>>>();
const effectStack: EffectFn[] = [];

const data = {
  ok: true,
  text: "Hello World",
  foo: "foo"
};

const obj = new Proxy<DataType>(data, {
  get(target, key: keyof DataType) {
    track(target, key);
    return target[key];
  },
  set(target, key: keyof DataType, newVal: never) {
    target[key] = newVal;
    return trigger(target, key);
  },
});

function track(target: DataType, key: keyof DataType) {
  console.log(`track: key: ${key}`);

  if (!activeEffect) {
    return;
  }
  let depsMap = buckets.get(target);
  if (!depsMap) {
    buckets.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

function trigger(target: DataType, key: keyof DataType) {
  console.log(`trigger: key: ${key}, value: ${target[key]}`);

  const depsMap = buckets.get(target);
  if (!depsMap) return true;
  const effects = depsMap.get(key);
  const effectsToRun = new Set(effects);
  effectsToRun.forEach((effectFn) => effectFn());
  // effects && effects.forEach(fn => fn());
  return true;
}

function cleanup(effectFn: EffectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

function effect(fn: Function) {
  console.log(buckets);
  const effectFn: EffectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}

let temp1, temp2;

effect(function effectFn1() {
  console.log("effectFn1 run");

  effect(function effectFn2() {
    console.log("effectFn2 run");
    temp2 = obj.foo;
  })

  temp1 = obj.text;
});

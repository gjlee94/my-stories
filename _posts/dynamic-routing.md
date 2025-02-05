---
title: "Next.js에서 SVG를 컴포넌트로 사용하기 (SVGR)"
excerpt: "Next.js에서 SVGR을 사용하면 SVG 파일을 React 컴포넌트처럼 활용할 수 있습니다. 이 글에서는 SVGR 설정 방법과 TurboPack 환경에서 발생할 수 있는 import 충돌 문제를 해결하는 방법을 설명합니다. Next.js에서 SVG를 최적화하여 효율적으로 사용하는 방법을 알아보세요."
date: "2025-01-29T05:35:07.322Z"
tags: ["트러블슈팅", "Next.js", "SVGR"]
category: "개발"
---

## 1. SVGR란?

SVGR은 SVG 파일을 Next.js 환경에서 React 컴포넌트처럼 사용할 수 있도록 변환해주는 라이브러리입니다. 일반적으로 Next.js에서 SVG를 사용하려면 `<img>` 태그를 이용하거나, `require` 혹은 `import`를 통해 파일을 불러오는 방식이 있지만, SVGR을 활용하면 SVG 파일을 직접 컴포넌트처럼 사용할 수 있습니다.

### **SVGR을 사용하면 얻을 수 있는 장점**

- **Next.js 페이지에서 SVG를 컴포넌트처럼 활용 가능**
- **CSS 커스터마이징이 용이**: `fill`, `stroke` 등의 속성을 props로 제어 가능
- **불필요한 HTTP 요청 감소**: `<img>` 태그 대신 컴포넌트로 렌더링하여 네트워크 요청 감소

---

## 2. Next.js에서 SVGR 설정하기

Next.js에서는 `@svgr/webpack`을 사용하여 SVG를 컴포넌트로 불러올 수 있습니다.

### **설치하기**

```sh
npm install @svgr/webpack
```

### **Next.js에서 설정하기**

Next.js의 `next.config.js`에서 Webpack 설정을 추가해야 합니다.

```js
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
```

이렇게 설정하면 `import`를 통해 SVG를 컴포넌트로 사용할 수 있습니다.

---

## 3. Next.js 환경에서 발생할 수 있는 문제 (TurboPack 사용 시)

Next.js의 최신 버전에서는 개발 환경에서 `TurboPack`이 기본적으로 사용됩니다. `TurboPack`을 사용할 때 동일한 파일에서 여러 개의 SVG 파일을 import하면 **덮어쓰는 현상**이 발생할 수 있으며, 특정 경우에는 `Processing image failed` 오류가 발생할 수도 있습니다.

### **발생하는 문제**

```sh
Processing image failed
Failed to parse svg source code for image dimensions

Caused by:
- Source code does not contain a <svg> root element
```

이 오류는 TurboPack이 특정 방식으로 SVG 파일을 처리하는 과정에서 **정확한 SVG Root Element를 찾지 못할 경우** 발생할 수 있습니다. 특히, 동일한 파일에서 여러 개의 SVG를 import하면 TurboPack이 캐싱 최적화를 수행하면서 **덮어쓰기 현상이 발생하여 잘못된 결과를 반환**할 수 있습니다.

### **해결 방법 (next.config.js 수정)**

이 문제를 해결하려면 `next.config.js`에서 `webpack` 설정에 `as: "*.js"` 옵션을 추가해야 합니다.

```js
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            as: "*.js", // TurboPack 환경에서 중복 import 및 처리 오류 방지
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
```

### **`as: "*.js"` 옵션의 역할**

- **각 SVG 파일을 별도의 JavaScript 모듈로 변환하여 TurboPack의 캐싱 충돌을 방지**
- **SVG 파일을 import할 때 중복되거나 덮어써지는 문제 해결**
- **`Processing image failed` 오류를 방지하여 SVG가 올바르게 파싱될 수 있도록 보장**

이렇게 설정하면 TurboPack을 사용할 때도 문제가 발생하지 않습니다.

---

## **마무리**

SVGR을 활용하면 Next.js에서 SVG를 컴포넌트로 간편하게 사용할 수 있습니다. 그러나 TurboPack 환경에서는 여러 개의 SVG를 import할 때 덮어쓰는 문제가 발생할 수 있으며, `Processing image failed` 오류가 발생할 수도 있습니다. 이를 방지하기 위해 `as: "*.js"` 옵션을 추가하는 것이 필요합니다.

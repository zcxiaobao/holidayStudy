## 变量声明
1. 存储限定符 类型 变量名
2. 存储限定符 限定变量类型

### 存储变量符
1. attribute: 与顶点有关的数据 —— 一个顶点
2. uniform: 传输的是对于所有顶点都相关(无关)的数据(全局变量)
3. textures: 纹理——皮肤
4. Varying: 是一种顶点着色器给片元着色器传值的方式。**？？？**

### 变量数据类型
1. 矢量
   + vec2 vec3 vec4 2/3/4维浮点数元素的矢量
   + ivec2 ivec3 ivec4 2/3/4维整数元素的矢量
   + bvec2 bvec3 bvec4 2/3/4维布尔值元素的矢量

2. 矩阵 mat2 mat3 mat4 `2*2 3*3 4*4` 矩阵

### 顶点着色器的内置变量
vec4 gl_Postion: 表示顶点位置
float gl_PointSize 表示点的尺寸(像素数)

> gl_Postion必须被赋值，否则着色器无法正常工作。gl_PointSize不是必须的，不赋值默认值为1.0

### 片元着色器内置变量
vec4 gl_FragColor 指定片元颜色(RGBA)

### 创建着色器
```js
// 创建着色器
gl.createShader(type)
// type: gl.VERTEX_SHADER / gl.FRAGMENT_SHADER
// 向着色器传入数据
gl.shaderSource(shader, source)
// 编辑着色器
gl.compileShader(shader)
```
## gl.drawArrays(mode, first, count)
- mode: gl.POINTS/点 gl.
const posLeftFun = (radio) => {
  if (radio < 0) {
    return 0;
  } else if (radio <= 0.3333) {
    return 1.2215507265012215 * radio;
  } else if (radio <= 0.6666) {
    return 1.0393896532510394 * radio + 0.06071428571428572;
  } else if (radio <= 1) {
    return 0.7391378867083725 * radio + 0.26086211329162745;
  } else {
    return 1;
  }
};
const titleAlphaFun = (radio) => {
  if (radio < 0) {
    // return 0;
    return 1;
  } else if (radio <= 0.3333) {
    // return 3.0003 * radio;
    return 1;
  } else if (radio <= 0.6666) {
    return 1;
  } else if (radio <= 1) {
    return -2.9994 * radio + 2.9994;
  } else {
    return 0;
  }
};
const titleSizeFun = (radio) => {
  if (radio < 0) {
    return 1;
  } else if (radio <= 0.3333) {
    return -3.0003 * radio + 1;
  } else if (radio <= 0.6666) {
    return 0;
  } else if (radio <= 1) {
    return 0;
  } else {
    return 0;
  }
};

const infoAlphaFun = (radio) => {
  if (radio < 0) {
    return 0;
    // return 1;
  } else if (radio <= 0.3333) {
    return 3.0003 * radio;
    // return 1;
  } else if (radio <= 0.6666) {
    return 1;
  } else if (radio <= 1) {
    return -2.9994 * radio + 2.9994;
  } else {
    return 0;
  }
};
const ringAlphaFun = (radio) => {
  if (radio < 0) {
    return 1;
  } else if (radio <= 0.3333) {
    return 1;
  } else if (radio <= 0.6666) {
    return 1;
  } else if (radio <= 1) {
    return -2.9994 * radio + 2.9994;
  } else {
    return 0;
  }
};

const sizeFun = (radio) => {
  if (radio < 0) {
    return 1;
  } else if (radio <= 0.3333) {
    return -1.5001500150015001 * radio + 1;
  } else if (radio <= 0.6666) {
    return -0.8572285800008572 * radio + 0.7857142857142857;
  } else if (radio <= 1) {
    return -0.6427285971377152 * radio + 0.6427285971377152;
  } else {
    return 0;
  }
};

const topFun = (radio) => {
  if (radio < 0) {
    return 0;
  } else if (radio <= 0.3333) {
    // return 1.2640857994428885*radio;
    return 1.0601060106010602 * radio;
  } else if (radio <= 0.6666) {
    // return 1.1727061030976196*radio +0.030456852791878042;
    return 1.0801080108010803 * radio - 0.00666666666666671;
  } else if (radio <= 1) {
    // return 0.5633391088279806*radio +0.43666089117201945;
    return 0.8598280343931212 * radio + 0.14017196560687883;
  } else {
    return 1;
  }
};


export { posLeftFun, titleAlphaFun, titleSizeFun, infoAlphaFun, ringAlphaFun, sizeFun, topFun };

//求函数的方法
/*
var funString = (x0,y0,x1,y1)=>{var k = ((y1-y0)/(x1-x0)); return "y=" + k + "*radio +" + (-k*x1+y1);}

var fun = function (arr){
  var max=arr[0].v,min=arr[0].v;
  for(var i=1;i<arr.length;i++){
    if(max<arr[i].v){
      max = arr[i].v;
    }
    if(min>arr[i].v){
      min = arr[i].v;
    }
  }
  for(var i=0;i<arr.length;i++){
    arr[i].v = (arr[i].v-min)/(max-min);
  }
  console.log("-----begin-----");
  for(var i=0;i<arr.length-1;i++){
    let s = funString(arr[i].r,arr[i].v,arr[i+1].r,arr[i+1].v);
    console.log(s);
  }
  console.log("-----end-----");
}

var titleAlpha = [{r:0,v:0},{r:0.3333,v:1},{r:0.6666,v:0},{r:1,v:0}];
var titleSize = [{r:0,v:1},{r:0.3333,v:0},{r:0.6666,v:0},{r:1,v:0}];
var size = [{r:0,v:110},{r:0.3333,v:75},{r:0.6666,v:55},{r:1,v:40}];
var topA = [{r:0,v:-37},{r:0.3333,v:46},{r:0.6666,v:123},{r:1,v:160}];
var topA = [{r:0,v:0},{r:0.3333,v:53},{r:0.6666,v:107},{r:1,v:150}];
var posLeft = [{r:0,v:0},{r:0.3333,v:570},{r:0.6666,v:1055},{r:1,v:1400}];
var infoAlpha = [{r:0,v:1},{r:0.3333,v:1},{r:0.6666,v:0},{r:1,v:0}];
var ringAlpha = [{r:0,v:1},{r:0.3333,v:1},{r:0.6666,v:1},{r:1,v:0}];

console.log("=============titleAlpha");
fun(titleAlpha);
console.log("=============titleSize");
fun(titleSize);
console.log("===============size");
fun(size);
console.log("====================top");
fun(topA);
console.log("=====================posLeft");
fun(posLeft);
 console.log("=====================infoAlpha");
fun(infoAlpha);
 console.log("=====================ringAlpha");
fun(ringAlpha);
*/


//web将棋

/*
駒の割当
0 空のマス
1 歩
2 桂馬
3 香車
4 銀将
5 金将
6 角行
7 飛車
8 王将
9 玉将

状態の割当
0 自分の未成駒
1 自分の成駒
2 相手の未成駒
3 相手の成駒

配列に持っている駒のデータを配列の要素として書き込む
画像もこのデータに対応している名前にしています(相手の駒も共通)
*/

//スタートアップ時の将棋盤の状態
let masses = [
  ["23","22","24","25","29","25","24","22","23"],
  ["00","27","00","00","00","00","00","26","00"],
  ["21","21","21","21","21","21","21","21","21"],
  ["00","00","00","00","00","00","00","00","00"],
  ["00","00","00","00","00","00","00","00","00"],
  ["00","00","00","00","00","00","00","00","00"],
  ["01","01","01","01","01","01","01","01","01"],
  ["00","06","00","00","00","00","00","07","00"],
  ["03","02","04","05","09","05","04","02","03"],
]

//駒の判定（種類のみ）
function checkrow(n,m){
  const mass= n.toString()+m.toString();
  const komaData = masses[m][n]
  if(komaData[0]==0 || komaData[0]==2){
    switch(komaData[1]){
      case "0":
        return "空";
      case "1":
        return "歩兵";
      case "2":
        return "桂馬";
      case "3":
        return "香車";
      case "4":
        return "銀将";
      case "5":
        return "金将";
      case "6":
        return "角行";
      case "7":
        return "飛車";
      case "8":
        return "王将";
      case "9":
        return "玉将";

      default:
        return null;
    }
  }else if(komaData[0]==1 || komaData[0]==3){
    switch(komaData[1]){
      case "0":
        return "空";
      case "1":
        return "と金";
      case "2":
        return "成桂";
      case "3":
        return "成香";
      case "4":
        return "成銀";
      case "6":
        return "龍馬";
      case "7":
        return "龍王";

      default:
        return null;
    }
  }
}


function swapElemData(a, b, km, kn, vm, vn) {
  const parentA = a.parentNode;
  const nextA = a.nextSibling;

  const parentB = b.parentNode;
  const nextB = b.nextSibling;

  var temp = masses[kn][km];
  masses[kn][km] = masses[vn][vm];
  masses[vn][vm] = temp;

  parentA.insertBefore(b, nextA);
  parentB.insertBefore(a, nextB);
}

function move(km, kn, vm, vn){
  const krow = document.getElementById("board").getElementsByTagName("tr")[kn];
  const kel = krow.getElementsByTagName("td")[km];
  const vrow = document.getElementById("board").getElementsByTagName("tr")[vn];
  const vel = vrow.getElementsByTagName("td")[vm];
  swapElemData(kel, vel, km, kn, vm, vn);
}

function drawPointReset(){
  let a=0
  while(a<9){
    let b=0;
    while(b<9){
      const krow = document.getElementById("board").getElementsByTagName("tr")[a];
      const kel = krow.getElementsByTagName("td")[b];
      kel.style.backgroundColor = "rgb(235, 139, 23)";
      b++;
    }
    a++;
  }
}

function drawPoint(m, n){
  if(n<0||n>8||m<0||m>8) return;
  const krow = document.getElementById("board").getElementsByTagName("tr")[n];
  const kel = krow.getElementsByTagName("td")[m];
  if((kel.id).includes("自分の")) return;
  kel.style.backgroundColor = "rgb(163, 96, 15)";
};

function canmove(m, n){
  const krow = document.getElementById("board").getElementsByTagName("tr")[n];
  const kel = krow.getElementsByTagName("td")[m];
  //console.log(kel.style.backgroundColor);
  return kel.style.backgroundColor=="rgb(163, 96, 15)";
}

var koma = {
  x:0,
  y:0,
  nx:0,
  ny:0,
};
function wheremove(e, n, m){
  let komaName = checkrow(n, m);
  let idname = e.target.parentElement.id;
  if(idname.includes(checkrow(n, m))){
    let isvoid = false;
    switch(komaName){
      case "歩兵":
        drawPointReset();
        drawPoint(n, m-1);
        break;
      case "桂馬":
        drawPointReset();
        drawPoint(n-1, m-2);
        drawPoint(n+1, m-2);
        break;
      case "香車":
        drawPointReset();
        var a=1;
        while(a<8){
          drawPoint(n, m-a);
          a++;
          if(masses[m-a][n]) a=8;
        }
        break;
      case "銀将":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m+1);
        drawPoint(n+1, m+1);
        break;
      case "金将":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n+1, m+1);
        break;
      case "角行":
        drawPointReset();
        var a=0;
        while(a<9){
          if(a!=0) drawPoint(n+a, m+a);
          a++;
          if(masses[m+a][n+a] != "00") a=9;
        }
        a=0;
        while(a<-9){
          if(a!=0) drawPoint(n+a, m-a);
          a--;
          if(masses[m-a][n+a] != "00") a=-9;
        }
        a=0;
        while(a<9){
          if(a!=0) drawPoint(n-a, m+a);
          a++;
          if(masses[m+a][n-a]) a=9;
        }
        a=0;
        while(a<-9){
          if(a!=0) drawPoint(n-a, m-a);
          a--;
          if(masses[m-a][n-a] == "00") a=-9;
        }
        break;
      case "飛車":
        drawPointReset();
        var a=0;
        while(a<9){
          if(a!=0) drawPoint(n, m+a);
          a++;
          if(masses[m+a][n] != "00") a=9;
        }
        a=0;
        while(a>-9){
          if(a!=0) drawPoint(n+a, m);
          a--;
          if(masses[m][n+a] != "00") a=-9;
        }
        a=0;
        while(a<9){
          if(a!=0) drawPoint(n+a, m);
          a++;
          if(masses[m][n+a] != "00") a=9;
        }a=0;
        while(a<9){
          if(a!=0) drawPoint(n, m-a);
          a++;
          if(masses[m-a][n] != "00") a=9;
        }
        break;
      case "王将":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n-1, m+1);
        drawPoint(n, m+1);
        drawPoint(n+1, m+1);
        break;
      case "玉将":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n-1, m+1);
        drawPoint(n, m+1);
        drawPoint(n+1, m+1);
        break;
      case "空":
        isvoid = true;
        console.log("空", e.target);
        if(koma.x == null || koma.y == null) break;
        koma.nx=n;
        koma.ny=m;
        const canMove = canmove(koma.nx, koma.ny);
        console.log(canMove);
        if(canMove){
          console.log(koma.x, koma.y, koma.nx, koma.ny);
          move(koma.x, koma.y, koma.nx, koma.ny);
        }
        drawPointReset();
        koma.x=null;
        koma.y=null;
        koma.nx=null;
        koma.ny=null;
        break;
      case "と金":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n+1, m+1);
        break;
      case "成桂":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n+1, m+1);
        break;
      case "成香":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n+1, m+1);
        break;
      case "成銀":
        drawPointReset();
        drawPoint(n-1, m-1);
        drawPoint(n, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n+1, m+1);
        break;
      case "龍馬":
        drawPointReset();
        var a=0;
        while(a<9){
          if(a!=0) drawPoint(n+a, m+a);
          a++;
          if(masses[n+a][m+a] != "00") a=9;
        }
        a=0;
        while(a<-9){
          if(a!=0) drawPoint(n+a, m-a);
          a--;
          if(masses[n+a][m-a] != "00") a=-9;
        }
        a=0;
        while(a<9){
          if(a!=0) drawPoint(n-a, m+a);
          a++;
          if(masses[n-a][m+a]) a=9;
        }
        a=0;
        while(a<-9){
          if(a!=0) drawPoint(n-a, m-a);
          a--;
          if(masses[n-a][m-a] == "00") a=-9;
        }
        drawPoint(n, m-1);
        drawPoint(n-1, m);
        drawPoint(n+1, m);
        drawPoint(n, m+1);

        break;
      case "龍王":
        drawPointReset();
        var a=0;
        while(a<9){
          if(a!=0) drawPoint(n, m+a);
          a++;
          if(masses[m+a][n] != "00") a=9;
        }
        a=0;
        while(a>-9){
          if(a!=0) drawPoint(n+a, m);
          a--;
          if(masses[m][n+a] != "00") a=-9;
        }
        a=0;
        while(a<9){
          if(a!=0) drawPoint(n+a, m);
          a++;
          if(masses[m][n+a] != "00") a=9;
        }a=0;
        while(a<-9){
          if(a!=0) drawPoint(n, m+a);
          a--;
          if(masses[m+a][n] != "00") a=-9;
        }
        drawPoint(n-1, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n+1, m-1);
        drawPoint(n+1, m+1);
        break;

    }
    if(!isvoid){
      koma.x = n;
      koma.y = m;
    }else{
      isvoid = false;
    }
    console.log(koma.x, koma.y, koma.nx, koma.ny);
  }
}

function clickE(e) {
  e.stopPropagation();
  const target = e.target.parentElement;

  const parent = target.parentElement;
  const child = parent.children;

  const parent_p = parent.parentElement;
  const parent_p_child = parent_p.children;

  wheremove(e, Array.from(child).indexOf(target), Array.from(parent_p_child).indexOf(parent));
  //取得したマス目の位置
  return [
    Array.from(child).indexOf(target),
    Array.from(parent_p_child).indexOf(parent)  
  ];
}

function setup(){
  const board = document.getElementById("board");
  const rows = [];
  
  var count=0;
  while(count<9){
    var colcount=0;
    let mass, tr;
    tr = document.createElement("tr");
    while(colcount<9){
      mass = document.createElement("td");
      let massname = checkrow(colcount,count);
      
      const img = document.createElement("img");
      img.addEventListener("click", (e)=>{
        clickE(e);
      });
      
      const imgData = "0"+masses[count][colcount][1];

      if(imgData != "00") img.src = `./koma/${"0"+masses[count][colcount][1]}.png`;
      if(count<3) img.style = "transform: rotate(-180deg)";
      mass.appendChild(img);

      mass.setAttribute("id", (massname!="空"?(count>5?"自分の":"相手の"):"")+massname);
      tr.appendChild(mass);
      colcount++;
    }
    
    tr.setAttribute("id", `row_${count}`);
    rows[count] = tr
    count++;
  }
  rows.forEach((n)=>{
    board.appendChild(n);
  });
}

setup();


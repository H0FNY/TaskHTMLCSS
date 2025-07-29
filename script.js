var currentPage=1;


var input = document.getElementById('fileUpload');
var fileBase64 = ""; // to store image base64 data

// Handle file upload
input.addEventListener("change", function () {
    const file = input.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            fileBase64 = e.target.result; 
        };
        reader.readAsDataURL(file);
    } else {
        fileBase64 = "";
    }
});



function post(){
    var Aques=document.getElementById("askQuestion").value;
    var Ades=document.getElementById("addDescription").value;


    if (!Aques.trim() && !Ades.trim() && !fileBase64) {
        alert("Please fill in all fields or upload an image.");
        return;
    }


    var pos={"question":Aques,"description":Ades,"fileName":fileBase64};
    
    if(localStorage.getItem("posts")==null)
        localStorage.setItem("posts", JSON.stringify([pos]));
    else{
        var arr=JSON.parse(localStorage.getItem("posts"));

        arr.push(pos);
        localStorage.setItem("posts", JSON.stringify(arr));
    }
    clearInputs();
}
function clearInputs() {
    document.getElementById("askQuestion").value = "";
    document.getElementById("addDescription").value = "";
    input.value = "";
    fileBase64 = "";
}


function onlooad(){
    window.onscroll = function () {
    var btn = document.getElementById("goTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {

        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};
    drawBlog();
}

function drawBlog(){
    var arr=JSON.parse(localStorage.getItem("posts"));
    console.log(arr);
    var numPosts= arr.length;
    var start = (currentPage-1)*3;
    var end = start + 3;
    var blogs=document.getElementById("blogs");
    blogs.innerHTML="";
    for(var i=start;i<Math.min(end,arr.length);i++){
    var blog=document.createElement("div")
    blog.setAttribute("id","blog");
    var h2=document.createElement("h2")
    h2.textContent=arr[i]["question"];
    blog.appendChild(h2);
    var sp1=document.createElement("span");
    blog.appendChild(sp1);
    var img=document.createElement("img");    
    img.src=arr[i]["fileName"];
    blog.appendChild(img);
    var para=document.createElement("p")
    para.textContent=arr[i]["description"];
    blog.appendChild(para);
    var sub=document.createElement("div")
    sub.setAttribute("class","sub");
    var comment=document.createElement("div")
    comment.setAttribute("class","comment");
    var commentIcon=document.createElement("i")
    commentIcon.setAttribute("class","fa-solid fa-comment");
    var commentNum=document.createElement("span")
    commentNum.textContent="1";
    comment.appendChild(commentIcon);
    comment.appendChild(commentNum);
    sub.appendChild(comment)
    blog.appendChild(sub)
    var inp=document.createElement("input")
    inp.type="text";
    inp.placeholder="Write a Comment";
    blog.appendChild(inp);
    var send=document.createElement("div")
    send.setAttribute("class","send");
    var sendIcon=document.createElement("i")
    sendIcon.setAttribute("class","fa-regular fa-paper-plane");
    send.appendChild(sendIcon);
    blog.appendChild(send);
    blogs.appendChild(blog);
    }
    var botBlogs=document.createElement("div")
    botBlogs.setAttribute("id","botBlogs")
    var add=document.createElement("button")
    add.setAttribute("id","addBlog");
    add.textContent="+"
    add.onclick=function(){
        window.open("question.html")
    }
    blogs.appendChild(add);
    blogs.appendChild(botBlogs)

    renderPagination(numPosts);
}

function renderPagination(numposts) {
    var totalPages = Math.ceil(numposts/3);
    
    var pagination = document.getElementById('pagination');
      pagination.innerHTML = '';

      var prev = document.createElement('button');
      prev.innerHTML = '←';
      prev.className = 'arrow';
      prev.disabled = currentPage === 1;
      prev.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          drawBlog();
        }
      };
      pagination.appendChild(prev);

      
      for (let i = 1; i <= totalPages; i++) {
        var btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'page-btn';
        if (i === currentPage) btn.classList.add('active');
        btn.onclick = () => {
          currentPage = i;
          drawBlog();
        };
        pagination.appendChild(btn);
      }

      
      const next = document.createElement('button');
      next.innerHTML = '→';
      next.className = 'arrow';
      next.disabled = currentPage === totalPages;
      next.onclick = () => {
        if (currentPage < totalPages) {
          currentPage++;
          drawBlog();
        }
      };
      pagination.appendChild(next);
    }
    
document.getElementById("goTop").addEventListener("click", function () {
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
});
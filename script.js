// const fileinput = document.querySelector(".file-input"),
// filteroptions = document.querySelectorAll(".filter button");
// filtername = document.querySelector(".filter-info .name");
// filtersilder = document.querySelector(".slider input");
// filtervalue = document.querySelector(".filter-info .value");
// rotateoptions = document.querySelectorAll(".rotate button");
// previewimg = document.querySelector(".preview-img img");
// choosebtn = document.querySelector(".choose-img");

// let bright = 100,saturate = 100, invert = 0,gray = 0;
// let rotate = 0; flip
// const applyfilters = () => {
//     previewimg.style.transform = `rotate(${rotate}deg)`;
//     previewimg.style.filter = `brightness(${bright}%) saturate(${saturate}%) invert(${invert}%) grayscale(${gray}%)`
// }

// const loadImage = () =>{
//     let file = fileinput.files[0];               //getting user selected file
//     if(!file)
//         return ;
//     previewimg.src = URL.createObjectURL(file);
//     previewimg.addEventListener("load", () => {
//         document.querySelector(".container").classList.remove("disable");
//     })
// }

// filteroptions.forEach(option => {
//     option.addEventListener("click", () => {
//         document.querySelector(".filter .active").classList.remove("active");
//         option.classList.add("active");
//       filtername.innerText = option.innerText;

//         if(option.id === "brightness") {
//             filtersilder.max = "200";
//             filtersilder.value = bright;
//             filtervalue.innerText = `${bright}%`;
//         }
//         else if(option.id === "saturation") {
//             filtersilder.max = "200";
//             filtersilder.value = saturate;
//             filtervalue.innerText = `${saturate}%`;
//         }
//         else if(option.id === "inversion") {
//             filtersilder.max = "100";
//             filtersilder.value = invert;
//             filtervalue.innerText = `${invert}%`;
//         }
//         else{
//             filtersilder.max = "100";
//             filtersilder.value = gray;
//             filtervalue.innerText = `${gray}%`;
//         }

        
//     });
// })

// rotateoptions.forEach(option => {
//     option.addEventListener("click", () => {
//         if(option.id === "left") {
//             rotate -= 90;
//         }
//         else if(option.id === "right") {
//             rotate += 90;
//         }
//         else if(option.id === "horizontal") {
//             rotate -= 180;
//         }
//         else{
//             rotate += 180;
//         }

//         applyfilters();
//     });
// })

// const updatefilter = () => {
//     filtervalue.innerText = `${filtersilder.value}%`;
//     const selectedfilter = document.querySelector(".filter .active");

//     if(selectedfilter.id === "brightness") {
//         bright = filtersilder.value;
//     }
//     else if(selectedfilter.id === "saturation") {
//         saturate = filtersilder.value;
//     }
//     else if(selectedfilter.id === "inversion"){
//         invert = filtersilder.value;
//     }
//     else{
//         gray = filtersilder.value;
//     }
//     applyfilters();
// }

// filtersilder.addEventListener("input",updatefilter);
// fileinput.addEventListener("change",loadImage);
// choosebtn.addEventListener("click",()=> fileinput.click());


const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
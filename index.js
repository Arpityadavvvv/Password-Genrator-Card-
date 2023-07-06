//                                  [FETCHING ALL THE IMPORTANT ELEMENT ]

const slider=document.querySelector("[data-lenghtslider]")// [1] Slider itself  

const slider_value = document.getElementById("value")  //[2] Slider value (slide krne pr jo change horha hai wo he yeh)

const label_1=document.getElementById("chck_1") //[3]-[6] Input checkbox pr click krne pr kya ho uske liye 

const label_2=document.getElementById("chck_2")

const label_3=document.getElementById("chck_3")

const label_4=document.getElementById("chck_4")

const genrate_btn=document.getElementById("btn_2") // [7] genrate button pr click kro uske liye 

const strength_indicator=document.querySelector("[data-indicator]") //[8] password ki strength kya thi 

const show_password=document.getElementById("password_show") //[9] kya password show hoga usme 

const copy_btn =document.querySelector("[data-copy]") //[10] ye button hai wo wala copy wala 

const copy_click = document.querySelector("[data-copyMsg]") // [11] copy wala icon button jo hai uske liye 

const all_checkboxes=document.querySelectorAll("input[type=checkbox]") // [12 ] isse sare checkboes aajaynge ek sath 


//                                  [MAKE SOME OWN VARIABLES IN IT ]

let password="";
let checkcount=0;
let passlength=10;

const symbols ='@#$*&_-~/?|*[]{}<>:=';

//                                   [ FUNCTIONS  ]


// [1] slider pehle kesa set rhega uske liye 

function handling_slider () 
{
    slider.value=passlength;
    slider_value.textContent=passlength;
    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize = ((passlength-min)*100/(max-min)) + "% 100";
}

// handling_slider();
indicator_setting("#ccc")


// [2] Indicator ke liye hai 

function indicator_setting (color)
{
    strength_indicator.style.backgroundColor = color;
}

// [3] Random integer get krne ke liye function bnaynge                              **VVIMP

function get_random_integer (min,max)
{
    return Math.floor(Math.random()*(max-min))+min;  // Detailed explained in copy 
}

// [4] This function will use for integers & take help of no [3] function 

function genrate_random_number()
{
    return  get_random_integer (0,9);   // kyoki integer tO ME BHI 0-9 ME HI REHTE HAI 
}


// [5] This is used for upper case letters 

function genrate_uppercase ()
{
    return String.fromCharCode(get_random_integer(65,91));  // 65 is inclusive and 91 is exclusive
}

// [6] This is used for lower case letters 

function genrate_lowercase ()
{
    return String.fromCharCode(get_random_integer (97,123));
}

// [7] This is used for symbols 
function genrate_symbols ()
{
  const symbl_index = get_random_integer(0,symbols.length); // pehle random uss string se nikala 0-length tk me 
  return symbols.charAt(symbl_index);
    // or phir return krdiya uss index ke symbol ko 
} 

// [8]  This is for strength checking of password based on random if-else logic 
function strength_checking ()
{
    let only_int=false;
    let only_uppercase=false;
    let only_lowercase=false;
    let only_symbol=false;

    if(label_1.checked)
    only_uppercase=true;

    if(label_2.checked)
    only_lowercase=true;

    if(label_3.checked)
    only_int=true;

    if(label_4.checked)
    only_symbol=true;


    if(only_lowercase && only_int && (only_uppercase || only_symbol)&& passlength>=8)
    {
        indicator_setting("#00FF00");
    }

    else if ((only_lowercase || only_uppercase) && (only_symbol || only_int) && passlength>=6)
    {
        indicator_setting("#FFFF00");
    }

    else
    {
        indicator_setting("#FF0000");
    }



}

// [9] This function is for copying the genrated passwords the clipboards 

// we will use try and catch because (if promise is not resolved then we've to throw errors )

async function clipboard_copying () // async isliye kyoki hume await use krna hai for promise resolve
{
    try
   {

    await navigator.clipboard.writeText(show_password.value);
    copy_click.textContent="Copied";  // paswword hogya  clipboard me copy

   }

   catch(e)
   {
     copy_click.textContent="failed";  // paswword nhi hua clipboard me copy 
   }

   // for making copyvisible for some time  and then for removing after 3sec we use settimeout 
   copy_click.classList.add("active");

   setTimeout(() => {
    copy_click.classList.remove("active");  
   }, 3000);
}

// [10] shuffle function based 
function shuffle (arr)
{
 
    // Start from the last element and swap
    // one by one. We don't need to run for
    // the first element that's why i > 0
    for (let i = arr.length-1; i > 0; i--)
    {
     
        // Pick a random index from 0 to i inclusive
        const j = Math.floor(Math.random() * (i + 1));
 
        // Swap arr[i] with the element
        // at random index
        const temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }

    let str='';
    arr.forEach((el)=>(str+=el));

    return str;



    


}




 




//                                         Adding EvrentListners  

// [1] yeh jo slider ki movement se inbuilt value jo change hogi wo passlength me dalkr ukso handling slider funxtin me bhej denge 

slider.addEventListener("input",(e)=> {
    passlength=e.target.value;
    handling_slider();
})
handling_slider();

// [2] agr wo input box me kuch password ki value hogi to hi to copy hogi 
copy_btn.addEventListener("click",()=>
{
    if(show_password.value)  // IF TRUE 
    clipboard_copying();
})

// [3]

function handlecount()
{
  checkcount=0;
  all_checkboxes.forEach((checkbox)=>
  {
    if(checkbox.checked)
    checkcount++;
  });

  if(passlength<checkcount)
  {
    passlength=checkcount;
    handling_slider(); 
  }
   // phir password ki length change hui hai 
}

all_checkboxes.forEach((checkbox)=> (
    checkbox.addEventListener('change',handlecount)
));







console.log('doin something ')





// [3] 
genrate_btn.addEventListener("click",()=>
{
    if(checkcount==0)
    return 

    if(passlength<checkcount) {
    passlength=checkcount;
    handling_slider();
    }

    console.log(' started from here and initialising password')

    // intializing password to empty
    password=""; 

    // Make one array for getting info about checkbox
    let funArr=[];

    if(label_1.checked)
    funArr.push(genrate_uppercase);

    if(label_2.checked)
    funArr.push(genrate_lowercase);

    if(label_3.checked)
    funArr.push(genrate_random_number);

    if(label_4.checked)
    funArr.push(genrate_symbols);

    console.log(funArr);

   

    console.log('compulsory addition ');


   

    //compulsory addition 
    for(let i=0;i<funArr.length;i++)
    {
        password = password + funArr[i]();   // ye compulsory hai ki alo or dhamiya to chaiyeee hi hai 
    }  

    // remaining additions 
      
    //console.log('the array length is ' + funArr.length );

    //console.log('the diffrence is ' + (passlength-funArr.length) )

    for(let i=0; i<(passlength-funArr.length); i++)   // is loop se remaining length ko fill krenge 

    {
        let ran_index=get_random_integer(0,funArr.length)
        

        password =  password + funArr[ran_index]();

    }

    console.log(password);

    let store = shuffle(funArr);    // just for seeing it 

    console.log(store);

   


    // shuffling 
    password=shuffle(Array.from(password));  // yha se value shuffle hogyi 

    

    show_password.value = password;

    
      strength_checking();


     
    
});











// function genrate_random_number ()
// {    return  get_random_integer (0,9);  
//                                                  // kyoki integer tO ME BHI 0-9 ME HI REHTE HAI
//      }
// function genrate_uppercase ()
// {    return get_random_integer(65,91);  // 65 is inclusive and 91 is exclusive
// }
// function genrate_lowercase ()
// {    return get_random_integer (97,123);}
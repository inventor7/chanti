<template>
    <div class="card flex flex-col justify-start  items-center w-full  rounded-2xl bg-base-100   hover:text-white transition-all duration-200 ease-in-out cursor-pointer shadow-md    ">
        <figure>
            <span class="material-icons text-7xl sm:text-8xl md:text-9xl text-center ">
                {{ iconName }}
            </span>
        </figure>
        <div class="text-center  ">
            <h2 class="card-title text-2xl ">{{ title }}</h2>
        </div>
    </div>
</template>

<script >


export default {
    name:'Card',
    props :{ 
        title :{
            type : String
        },
        iconName : {
            type :String
        }
     }
}

</script>


<template>
    <Navbar data-theme="providerTheme" :showLogin="true" />
    <div data-theme="providerTheme" class="main-content flex flex-col justify-center items-start w-full mt-[5rem] ">
        <div class="grid place-items-center rounded-2xl w-full h-full px-2   ">

            <div class=" relative flex flex-col justify-between w-full h-fit sm:h-[50vh] md:h-[70vh] rounded-2xl    ">
                <!-- add an overlay image -->
                <img src="../../assets/OIG.jpg"
                    class="w-full absolute top-0 left-0 -z-20  h-full object-cover sm:object-cotain rounded-2xl " />
                <!-- add a gradient -->
                <div class="absolute top-0 left-0 -z-10 w-full h-full  bg-black opacity-90 rounded-2xl "></div>

                <div class="px-2 flex-1  sm:px-4 w-full h-fit  flex flex-row justify-start items-center py-0  ">
                    <div class="w-flex max-w-5xl  flex-col py-4 md:gap-6 justify-between items-start ">
                        <h1 v-if="userStore.$state.isloggedin == false || authStore.$state.isloggedin == false"
                            class="  text-2xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl   text-black whitespace-normal mb-5 font-bold">
                            {{ languageStore.getWord('title') }}
                            <span class="underline underline-offset-4 text-primary">
                                {{ languageStore.getWord('endTitle') }}
                            </span>
                        </h1>
                        <h1 v-else
                            class="  text-3xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl   text-black whitespace-normal mb-5 font-bold">
                            Welcome
                            <span class="underline underline-offset-4 text-primary">
                                {{ userStore.$state.userAuth.lastName.toUpperCase() }}
                            </span>
                        </h1>

                    </div>
                </div>


            </div>


        </div>







        <Modal class=" flex flex-col justify-center items-center gap-4  sm:gap-8 md:gap-10  h-full ">
            <div class=" flex flex-col items-end justify-end w-full  px-2 sm:px-10 md:px-20 lg:px-32 ">
                <label @click="modalStore.toggleModal"
                    class="btn btn-error place text-sm md:text-lg btn-sm md:btn-md btn-circle right-[20%] top-[10%] ">✕</label>
            </div>

            <div
                class=" grid grid-cols-2 px-2     items-center bg-transparent sm:gap-8  md:gap-12 lg:gap-16  max-w-lg     gap-4 ">
                <Card @click="toggleModalLogin('clientTheme', 'client')" :title="languageStore.getWord('client')"
                    iconName="person" class=" hover:bg-[#db4024]/90  sm:p-12 md:p-14     p-10 w-full " />
                <Card @click="toggleModalLogin('providerTheme', 'provider')" :title="languageStore.getWord('provider')"
                    iconName="engineering" class=" hover:bg-[#2c5cc5]/90  sm:p-12 md:p-14  p-10 w-full " />
            </div>
        </Modal>

    </div>

    <div class="flex flex-col gap-2   justify-center items-center w-full h-full " >
        <div class="w-10/12 border-2 p-2 rounded-2xl  h-full ">
            <div class=" flex flex-col md:flex-row w-full h-full rounded-2xl p-2 gap-2 font-semibold ">
                <div class="flex  flex-col border-2 border-dashed  justify-center items-center w-full rounded-2xl h-full  ">
                    <span @click="handleFileClick" class="material-icons text-4xl">
                        upload_file
                    </span>
                    <span>
                        <label class="inline-flex items-center  font-medium py-2 px-1  rounded-lg cursor-pointer ">
                            <span class="text-blue-700">Choose a file</span>
                            <input type="file" class="hidden" @change="handleFileUpload">
                        </label>
                        to upload
                    </span>
                    <div v-if="isDragging" class="dropzone bg-black ">Drop files here</div>
                    <!-- <p>Drag & Drop or <span class=" text-blue-700 " >Choose a file</span> to uppload</p> -->
                </div>
                <div class="w-full h-full rounded-2xl" :class="{ 'border-2': !selectedFiles.length }">
                    <div v-if="selectedFiles.length"
                        class="w-full max-h-[50vh] min-h-full grid grid-cols-2 grid-rows-2 gap-2">
                        <div class="relative h-full w-full " v-for="(url, index) in selectedFileUrls" :key="index">
                            <img class="h-full object-cover rounded-2xl " :src="url" :alt="'Image ' + (index + 1)" />
                            <span
                                class="absolute  rounded-full w-6 h-6 flex justify-center items-center cursor-pointer -top-1.5 -right-1.5 "
                                @click="selectedFiles.splice(index, 1)">
                                <span class="material-icons text-primary ">
                                    cancel
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="h-4/6 w-full flex flex-col justify-center items-start gap-2 ">
                <span class=" font-semibold text-xl ">Post Details</span>
                <textarea v-model="descText" rows="4" cols="50" maxlength="100"
                    class="w-full font-semibold  h-full rounded-2xl border-2 border-gray-300 p-4">
                                                    </textarea>
            </div>
        </div>
        <button @click="SendPost" class="btn btn-primary" >
            submit
        </button>
        <button  @click="handlegetPost" class="btn btn-primary" >
            <span class="material-icons">
                get_app
            </span>
        </button>
    </div>

    <Image />

    <Footer  class="mt-[1000px]" />
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import SearchBar from '../../components/SearchBar.vue'
import Howitworks from '../../components/Howitworks.vue'
import SearchPage from '../../components/SearchPage.vue'
import Modal from '../../components/Modal.vue'
import LoginModal from '../../components/LoginModal.vue'
import Card from '../../components/Crad.vue'
import Category from '../../components/Category/Category.vue'
import CategoriesList from '../../components/Category/CategoriesList.vue'
import Image from '../../components/Image.vue'
import { useCategoriesStore } from '../../store/categoriesStore'
import { useLanguageStore } from '../../store/languageStore'
import { useModalStore } from '../../store/modaleStore'
import { useThemeStore } from '../../store/themeStore.js'
import { useUserStore } from '../../store/userStore.js'
import { useProviderStore } from '../../store/providerStore'
import { useclientDemandeStore } from '../../store/clientDemandeStore.js'
import { useAuthStore } from '../../store/authStore.js'
import { useRouter } from 'vue-router'
import { computed, watchEffect, ref, reactive, watch } from 'vue'





export default {
    name: 'ProviderHome',
    components: { Navbar, Modal, CategoriesList,Image, LoginModal, Category, Footer, SearchBar, Card, Howitworks, SearchPage },
    setup() {
        //initialisation the store
        const languageStore = useLanguageStore()
        const themeStore = useThemeStore()
        const categoriesStore = useCategoriesStore()
        const modalStore = useModalStore()
        const userStore = useUserStore()
        const authStore = useAuthStore()
        const clientDemandeStore = useclientDemandeStore()
        const providerStore = useProviderStore()
        const router = useRouter()

        //props
        const notSelectedError = ref(false)
        const descText = ref('')

        const toggleModalLogin = (theme, userType) => {
            modalStore.toggleModalLogin()
            modalStore.toggleModal()
            themeStore.theme = theme
            userStore.user.userType = userType
        }


        const selectCategory = (category) => {
            clientDemandeStore.request.categoryId = category.id
            categoriesStore.fetchSubCategories(category)
            router.replace({ name: 'services' })
            notSelectedError.value = false
        }

        let selectedCategory = computed(() => {
            return categoriesStore.selectedCategory
        })

        const handleJoinNetwork = () => {
            userStore.user.userType = 'provider'
            themeStore.theme = 'providerTheme'
            router.replace({ name: 'howitworks' })
        }


        const isDragging = ref(false);
        const selectedFiles = reactive([]);
        const errorText = ref('')

        const handleClick = () => {
            router.replace({ name: 'desc' })
        }




        function handleFileUpload(event) {
            const files = event.target.files;
            // if files >4 return error
            if (clientDemandeStore.request.images.length > 3) {
                notSelectedError.value = true
                errorText.value = 'You can only select 4 images'
            }
            else {
                for (let i = 0; i < files.length; i++) {
                    selectedFiles.push(files[i]);
                }
            }
        }

        function handleDragEnter(event) {
            event.preventDefault();
            isDragging.value = true;
        }

        function handleDragOver(event) {
            event.preventDefault();
            isDragging.value = true;
        }

        function handleDragLeave(event) {
            event.preventDefault();
            isDragging.value = false;
        }

        function handleDrop(event) {
            event.preventDefault();
            isDragging.value = false;
            const files = event.dataTransfer.files;
            if (clientDemandeStore.request.images.length > 3) {
                notSelectedError.value = true
                errorText.value = 'You can only select 4 images'
            } else {
                for (let i = 0; i < files.length; i++) {
                    selectedFiles.push(files[i]);
                }
                clientDemandeStore.request.images = selectedFiles;
            }
        }

        watch(isDragging, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                if (newValue) {
                    document.addEventListener('dragenter', handleDragEnter);
                    document.addEventListener('dragover', handleDragOver);
                    document.addEventListener('dragleave', handleDragLeave);
                    document.addEventListener('drop', handleDrop);
                } else {
                    document.removeEventListener('dragenter', handleDragEnter);
                    document.removeEventListener('dragover', handleDragOver);
                    document.removeEventListener('dragleave', handleDragLeave);
                    document.removeEventListener('drop', handleDrop);
                }
            }
        });

        const selectedFileUrls = computed(() => {
            return selectedFiles.map((file) => URL.createObjectURL(file));
        });

        const handleFileClick = () => {
            document.querySelector('input[type="file"]').click();
        };


        const SendPost = () => {

            const formData = new FormData();
                formData.append("details", descText.value );
                formData.append("providerId", userStore.$state.userAuth.id);
                for (let i = 0; i <selectedFiles.length; i++) {
                    formData.append("images", selectedFiles[i]);
                }

                //print the form data content
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
            providerStore.sendPost(formData).then((res)=> {
                console.log(res)
            })
        }

        const handlegetPost = () => {
            providerStore.getPost(userStore.$state.userAuth.id).then((res)=> {
                console.log(res.data)
            })
        }








        return {
            // store
            themeStore,
            modalStore,
            userStore,
            categoriesStore,
            languageStore,
            authStore,
            providerStore,

            //vars
            selectedCategory,
            descText,

            //functions
            selectCategory,
            toggleModalLogin,
            handleJoinNetwork,
            SendPost,
            notSelectedError,
            errorText,

            //clientDemandeStore
            router,

            //methods
            handleClick, handleFileClick,handlegetPost,
            handleFileUpload, isDragging, selectedFileUrls, selectedFiles

        }

    }
}
</script>

<style>
::-webkit-scrollbar {
    width: 0;
    height: 0;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: #2c5cc5;
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
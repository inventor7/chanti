<template>
    <Navbar2 data-theme="providerTheme" :showLogin="true" />
    <Navbar3 data-theme="providerTheme" class=" fixed left-0 right-0 bottom-0" :showLogin="true" />
    <div data-theme="providerTheme" class="main-content flex flex-col justify-center mt-[5rem] items-start w-full ">



        <div class="flex flex-col gap-2  justify-center items-center w-full h-full ">
            


            <!-- posting images -->
            <div class="w-10/12 border-2 p-2 rounded-2xl  h-full ">
                <div class=" flex flex-col md:flex-row w-full h-full rounded-2xl p-2 gap-2 font-semibold ">
                    <div class=" w-full h-full space-y-2">
                        <label for="af-submit-app-upload-images"  class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ">
                            <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file"
                                class="sr-only" @change="handleFileUpload">
                            <svg class="w-10 h-10 mx-auto text-gray-400 " xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                                <path
                                    d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                            </svg>
                            <span class="mt-2 block text-sm text-gray-800 ">
                                Browse your device or <span class="group-hover:text-blue-700 text-blue-600">drag
                                    'n drop'</span>
                            </span>
                            <span class="mt-1 block text-xs text-gray-500">
                                Maximum file size is 2 MB
                            </span>
                        </label>
                    </div>
                    <div class=" h-full rounded-2xl" :class="{ 'border-2': !selectedFiles.length }">
                        <div v-if="selectedFiles.length"
                            class=" max-w-xs  h-full flex flex-row justify-around items-center gap-2">
                            <div class="relative h-full w-full " v-for="(url, index) in selectedFileUrls" :key="index">
                                <img class=" object-fil   rounded- " :src="url" :alt="'Image ' + (index + 1)" />
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
                    <span class=" font-medium text-lg ">Post Details</span>
                    <textarea v-model="descText" rows="4" cols="50" maxlength="100"
                        class="w-full font-semibold  h-full rounded-2xl border-2 border-gray-300 p-4">
                                                                </textarea>
                </div>
                <button @click="SendPost" class="btn mt-2 w-full text-white btn-primary">
                    Post
                </button>
            </div>

            <button @click="handlegetPost" class="btn btn-primary">
                <span class="material-icons">
                    get_app
                </span>
            </button>
        </div>

        <NotificationPage />
    </div>
</template>

<script>
import Navbar2 from '../../components/Navbar2.vue'
import SearchPage from '../../components/SearchPage.vue'
import Modal from '../../components/Modal.vue'
import Category from '../../components/Category/Category.vue'
import CategoriesList from '../../components/Category/CategoriesList.vue'
import NotificationPage from '../../components/NotificationPage.vue'
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
import Navbar3 from '../../components/Navbar3.vue'





export default {
    name: 'ProviderHome',
    components: { Navbar2, Modal, CategoriesList, Image, Category, SearchPage, Navbar3 , NotificationPage },
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
            formData.append("details", descText.value);
            formData.append("providerId", authStore.$state.userAuth.id);
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("images", selectedFiles[i]);
            }

            //print the form data content
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            providerStore.sendPost(formData).then((res) => {
                console.log(res)
            })
        }

        const handlegetPost = () => {
            console.log(authStore.$state.userAuth.id)
            providerStore.getPost(authStore.$state.userAuth.id).then((res) => {
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
            descText,

            //functions
            toggleModalLogin,
            handleJoinNetwork,
            SendPost,
            notSelectedError,
            errorText,

            //clientDemandeStore
            router,

            //methods
            handleClick, handleFileClick, handlegetPost,
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
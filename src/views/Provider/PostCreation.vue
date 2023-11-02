<template>
    <ProviderLayout>
        <div class="min-h-[75vh]">
            <label for="alert-modal"
                class="btn btn-primary gap-1 rounded-3xl text-white  fixed bottom-20 z-30 right-4 font-semibold">
                <span class="material-icons">
                    add
                </span>
                <span class=" md:block  ">
                    créer un poste
                </span>
            </label>

            <div class="w-full h-full flex flex-col items-center bg-white rounded-xl gap-2 mb-4 p-3">
                <div class="w-full h-full flex flex-row items-center bg-white rounded-xl gap-2">
                    <span class="material-icons text-2xl text-warning">
                        published_with_changes
                    </span>
                    <p class="text-sm font-semibold">
                        le post sera envoyé à l'administrateur pour approbation </p>
                </div>

                <div class="w-full h-full flex flex-row items-center bg-white rounded-xl gap-2">
                    <span class="material-icons text-2xl text-success">
                        verified
                    </span>
                    <p class="text-sm font-semibold">
                        le post sera publié directement
                    </p>
                </div>
            </div>

            <ProviderPosts  />
            <Alert w="normal" closeBtnText="Poster" @handleCloseBtn="SendPost" closeBtnColor="primary"
                toggleBtnText="créer un poste">
                <h2 class="text-2xl font-bold mb-2">
                    creation d'un post
                </h2>
                <div class="w-full bg-white border-2 p-2 rounded-2xl overflow-y-scroll h-full ">
                    <div class=" flex flex-col md:flex-row w-full h-full rounded-2xl p-2 gap-2 font-semibold ">
                        <div class=" w-full h-full space-y-2">
                            <label for="af-submit-app-upload-images"
                                class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ">
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
                                    Selectionner des images à télécharger
                                    <span class="group-hover:text-blue-700 text-blue-600">
                                        (ou glisser-déposer)
                                    </span>
                                </span>

                            </label>
                        </div>
                        <div class=" h-full rounded-2xl" :class="{ 'border-2': !selectedFiles.length }">
                            <div v-if="selectedFiles.length"
                                class=" max-w-xs  h-full flex flex-row justify-around items-center gap-2">
                                <div class="relative h-full max-h-32 w-fit md:w-full "
                                    v-for="(url, index) in selectedFileUrls" :key="index">
                                    <img class=" object-fil max-h-32  " :src="url" :alt="'Image ' + (index + 1)" />
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
                        <span class=" font-medium text-lg ">
                            Description
                        </span>
                        <textarea v-model="descText" rows="4" cols="50" maxlength="100"
                            class="w-full font-semibold  h-full rounded-2xl border-2 border-gray-300 p-4">                                                                                                                                                                          </textarea>
                    </div>
                </div>
            </Alert>

            <!-- Delete Post -->
            <Alert @handleCloseBtn="handleDeletePost" closeBtnText="Delete" toggleBtnText="Discard"
                message="Delete the post permanetly ?" modalName="delete-post-modal" />

            <!-- Edit Post -->
            <Alert @handleCloseBtn="handleEditPost" closeBtnText="Save" toggleBtnText="Cancel" message=""
                modalName="edit-post-modal">
                <h2 class="text-2xl font-bold mb-2">Editing Post</h2>
                <p class=" font-semibold text-error text-sm mb-1 ">* you can just add images or modify Description</p>
                <div class="w-full bg-white border-2 p-2 rounded-2xl overflow-y-scroll h-full ">
                    <div class=" flex flex-col md:flex-row w-full h-full rounded-2xl p-2 gap-2 font-semibold ">
                        <div class=" w-full h-full space-y-2">
                            <label for="af-submit-app-upload-images"
                                class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ">
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
                                    Select more images : <span class="group-hover:text-blue-700 text-blue-600">drag or
                                        drop</span>
                                </span>

                            </label>
                        </div>
                        <div class=" h-full rounded-2xl" :class="{ 'border-2': !selectedFiles.length }">
                            <div v-if="selectedFiles.length"
                                class=" max-w-xs  h-full flex flex-row justify-around items-center gap-2">
                                <div class="relative h-full max-h-32 w-fit md:w-full "
                                    v-for="(url, index) in selectedFileUrls" :key="index">
                                    <img class=" object-fil max-h-32  " :src="url" :alt="'Image ' + (index + 1)" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="h-4/6 w-full flex flex-col justify-center items-start gap-2 ">
                        <span class=" font-medium text-lg ">Post Details</span>
                        <textarea class="w-full font-semibold  h-full rounded-2xl border-2 border-gray-300 p-4" />
                    </div>
                </div>
            </Alert>
        </div>
    </ProviderLayout>
    <Toast class=" z-[70] top-0 " :color="errorState" :message="errorMessage" :isVisible="errorStatus" />
</template>

<script>

//Layout
import ProviderLayout from '../Layouts/ProviderLayout.vue';

//components
import Toast from '../../components/Toast.vue';

//vue
import { reactive, ref, watch, watchEffect, computed } from 'vue'

//store
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { defineAsyncComponent } from 'vue';
import { useAuthStore } from '../../store/authStore.js'
import { useProviderStore } from '../../store/Provider/providerStore';
import { usePortfolioStore } from '../../store/Provider/portfolioStore';
import Alert from '../../components/Alert.vue';

import { useRouter } from 'vue-router';
import ProviderPosts from '../../components/ProviderPosts.vue';

export default {
    name: "PostCreation",
    components: {
        ProviderLayout,
        Toast,
        Alert,
        ProviderPosts
    },
    setup() {
        //store
        const clientDemandeStore = useclientDemandeStore()
        const authStore = useAuthStore()
        const providerStore = useProviderStore()
        const portfolioStore = usePortfolioStore()
        const router = useRouter()

        //vars
        const selectedFiles = reactive([]);
        const postToEdit = ref({})
        const errorStatus = ref(false)
        const errorMessage = ref('')
        const errorState = ref('')
        const descText = ref('')



        //methods
        const handleDeletePost = () => {
            portfolioStore.deletePost(portfolioStore.$state.postToDelete.id).then((res) => {
                if (res.status == 200) {
                    errorStatus.value = true
                    errorMessage.value = 'Post deleted successfully'
                    errorState.value = 'success'
                    portfolioStore.$state.postToDelete = {}
                } else {
                    errorStatus.value = true
                    errorMessage.value = 'Error deleting post'
                    errorState.value = 'error'
                }

            })
        }


        const handleEditPost = () => {
            portfolioStore.editPost(portfolioStore.$state.postToEdit).then((res) => {
                if (res.status == 200) {

                    errorStatus.value = true
                    errorMessage.value = 'Post edited successfully'
                    errorState.value = 'success'
                    portfolioStore.$state.postToEdit = {}

                    //update post in portfolioPosts
                    portfolioStore.getProviderPosts(authStore.$state.userAuth.id).then((res) => {

                    })
                } else {
                    errorStatus.value = true
                    errorMessage.value = 'Error in editing post'
                    errorState.value = 'error'

                }

            })
        }

        //image upload
        function handleFileUpload(event) {
            const files = event.target.files;
            // if files >3 return error
            if (clientDemandeStore.request.images.length > 3) {
                errorStatus.value = true
                errorMessage.value = 'You can only upload 3 images'
                errorState.value = 'error'

            }
            else {
                for (let i = 0; i < files.length; i++) {
                    selectedFiles.push(files[i]);
                }
                clientDemandeStore.request.images = selectedFiles;
            }
        }


        const selectedFileUrls = computed(() => {
            return selectedFiles.map((file) => URL.createObjectURL(file));
        });

        const handleFileClick = () => {
            document.querySelector('input[type="file"]').click();
        };



        //send post
        const SendPost = () => {
            const formData = new FormData();
            if (selectedFiles.length == 0 || descText.value == '') {
                errorStatus.value = true
                errorMessage.value = 'Please select images and write a description'
                errorState.value = 'error'
            } else {
                formData.append("details", descText.value);
                formData.append("providerId", authStore.$state.userAuth.id);
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append("images", selectedFiles[i]);
                }

                providerStore.sendPost(formData).then((res) => {
                    if (res.status == 200) {
                        errorStatus.value = true
                        errorMessage.value = 'Post created successfully'
                        errorState.value = 'success'
                        selectedFiles.splice(0, selectedFiles.length)
                        descText.value = ''
                        setTimeout(() => {
                            errorStatus.value = true
                            errorMessage.value = 'we are redirecting you to your profile'
                            errorState.value = 'success'
                        }, 3000)

                        portfolioStore.getProviderPosts(authStore.$state.userAuth.id)
                    }

                })
            }
        }





        //watch
        watchEffect(() => {
            if (errorStatus.value) {
                setTimeout(() => {
                    errorStatus.value = false
                }, 3000)
            }
        })

        watchEffect(() => portfolioStore.$state.postToEdit, () => {
            descText.value = portfolioStore.$state.postToEdit.details
            selectedFiles.values = portfolioStore.$state.postToEdit.images
        })

        return {

            //store
            providerStore,
            portfolioStore,


            //methods
            handleFileClick,
            handleFileUpload,
            SendPost,
            handleDeletePost,
            handleEditPost,

            //vars
            selectedFiles,
            selectedFileUrls,

            errorStatus,
            errorMessage,
            errorState,

            descText,
        };
    }
};
</script>

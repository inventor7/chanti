<template>
    <ProviderLayout>
        <div class=" flex flex-col justify-center items-center w-full h-full p-2 gap-6  max-w-2xl ">
            <h1 class=" font-bold text-2xl text-start w-full ">Idendity Verification</h1>

            <div class="relative flex flex-col justify-center items-center w-full h-full p-2 ">
                <div class=" absolute  rounded-lg -z-10  w-full h-full bg-black/20 "> </div>
                <img src="../../assets/id.svg" alt="">
            </div>

            <div class=" flex flex-col justify-start items-center w-full h-full my-20 gap-3 ">
                <h1 class=" font-bold text-xl text-center w-full ">Scanner Votre catred d’idendité</h1>
                <p class=" text-sm text-gray-400 text-center">Veuillez ouvrir votre caméra et placer votre téléphone
                    au-dessus de votre carte d'identité, en vous
                    assurant que votre visage est clairement visible pour une vérification réussie</p>
            </div>

            <label for="verifyIdendity" class="btn btn-primary text-white w-1/2 gap-2  rounded-lg ">
                <svg class="text-3xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M15.418 5.643a1.25 1.25 0 0 0-1.34-.555l-1.798.413a1.25 1.25 0 0 1-.56 0l-1.798-.413a1.25 1.25 0 0 0-1.34.555l-.98 1.564c-.1.16-.235.295-.395.396l-1.564.98a1.25 1.25 0 0 0-.555 1.338l.413 1.8a1.25 1.25 0 0 1 0 .559l-.413 1.799a1.25 1.25 0 0 0 .555 1.339l1.564.98c.16.1.295.235.396.395l.98 1.564c.282.451.82.674 1.339.555l1.798-.413a1.25 1.25 0 0 1 .56 0l1.799.413a1.25 1.25 0 0 0 1.339-.555l.98-1.564c.1-.16.235-.295.395-.395l1.565-.98a1.25 1.25 0 0 0 .554-1.34L18.5 12.28a1.25 1.25 0 0 1 0-.56l.413-1.799a1.25 1.25 0 0 0-.554-1.339l-1.565-.98a1.25 1.25 0 0 1-.395-.395zm-.503 4.127a.5.5 0 0 0-.86-.509l-2.615 4.426l-1.579-1.512a.5.5 0 1 0-.691.722l2.034 1.949a.5.5 0 0 0 .776-.107z"
                        clip-rule="evenodd" />
                </svg>
                <span>verify</span>
            </label>



        </div>




        <Alert w="normal" closeBtnText="Poster" @handleCloseBtn="SendPost()" closeBtnColor="primary"
            toggleBtnText="créer un poste" modalName="verifyIdendity">
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
                            <div class="relative h-full max-h-32 w-fit md:w-full " v-for="(url, index) in selectedFileUrls"
                                :key="index">
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

            </div>
        </Alert>

        <Toast class=" z-[70] top-0 " :color="errorState" :message="errorMessage" :isVisible="errorStatus" />

    </ProviderLayout>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '../../store/Provider/portfolioStore'
import { useProviderStore } from '../../store/Provider/providerStore'
import { useAuthStore } from '../../store/authStore'
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'

import { reactive, ref, watch, watchEffect, computed } from 'vue'

import Toast from '../../components/Toast.vue'
import Alert from '../../components/Alert.vue'
import ProviderLayout from '../../views/Layouts/ProviderLayout.vue'
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







//image upload
function handleFileUpload(event) {
    const files = event.target.files;
    // if files >3 return error
    if (clientDemandeStore.request.images.length > 1) {
        errorStatus.value = true
        errorMessage.value = 'You can only upload 1 image'
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
    if (selectedFiles.length == 0 || selectedFiles.length > 1) {
        errorStatus.value = true
        errorMessage.value = 'Please select 1 image to upload'
        errorState.value = 'error'
    } else {
        formData.append("providerId", authStore.$state.userAuth.id);

        formData.append("images", selectedFiles[0]);


        console.log(formData)

        providerStore.verifyIdendity(formData).then((res) => {
            if (res.status == 200) {
                errorStatus.value = true
                errorMessage.value = 'Post created successfully'
                errorState.value = 'success'

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




</script>

<template>
    <SignupLayout prevLink="emergency" :pageNumber="4" :isError="notSelectedError" :errorText="errorText" nextBtnText="Next"
        @handle="handleClick" pageTitle=" Choose Urgency" pageDesc=" select the urgency of your request "
        componentLocation="selectionProcess">

        <div class=" flex flex-row justify-around w-full  h-full py-2 flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-center items-center gap-3 w-full md:mb-0 mb-20 h-full ">
                <!-- a select component with modern design to select multiple emergency status as urgent , not urgent , etc -->
                <transition name="fade">
                    <!--  select images -->
                    <div class=" flex flex-col md:flex-row w-4/5 h-full rounded-2xl p-2 gap-2 font-semibold ">
                        <div
                            class="flex  flex-col border-2 border-dashed  justify-center items-center w-full rounded-2xl h-1/4  ">
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
                        </div>
                        <div v-if="selectedFiles.length>0" class="w-full h-1/2 rounded-2xl" :class="{ 'border-2': !selectedFiles.length }">
                            <div v-if="selectedFiles.length"
                                class="w-full h-full min-h-full grid grid-cols-2 grid-rows-2 gap-2">
                                <div class="relative h-full w-full " v-for="(url, index) in selectedFileUrls" :key="index">
                                    <img class="h-full object-cover rounded-2xl " :src="url"
                                        :alt="'Image ' + (index + 1)" />
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
                </transition>


            </div>
        </div>

    </SignupLayout>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import { useUserStore } from '../../store/userStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { useRouter } from 'vue-router';
import { computed, ref, watch, reactive, watchEffect } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage4',
    components: { SignupLayout, Category, Error, Loading },
    setup() {

        const isDragging = ref(false);
        const selectedFiles = reactive([]);
        //props
        const notSelectedError = ref(false)


        // clientDemandeStore
        const router = useRouter()
        const userStore = useUserStore()
        const clientDemandeStore = useclientDemandeStore()
        const errorText = ref('')

        const handleClick = () => {
            router.push({ name: 'desc' })
        }




        function handleFileUpload(event) {
            const files = event.target.files;
            // if files >4 return error
            if (clientDemandeStore.request.images.length > 3) {
                notSelectedError.value = true
                errorText.value = 'You can only select 3 images'
            }
            else {
                for (let i = 0; i < files.length; i++) {
                    selectedFiles.push(files[i]);
                }
                clientDemandeStore.request.images = selectedFiles;
            }
        }

        watchEffect(() => {
            if (clientDemandeStore.request.images.length > 3) {
                notSelectedError.value = true
                errorText.value = 'You can only select 3 images'
            }
        })


        const selectedFileUrls = computed(() => {
            return selectedFiles.map((file) => URL.createObjectURL(file));
        });

        const handleFileClick = () => {
            document.querySelector('input[type="file"]').click();
        };





        return {
            //props
            notSelectedError,
            errorText,

            //clientDemandeStore
            router,

            //methods
            handleClick, handleFileClick,
            handleFileUpload, selectedFileUrls, selectedFiles
        }
    },

}

</script>

<style></style>
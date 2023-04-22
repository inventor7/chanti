<template>
    <ProviderLayout>

        <!-- Card Section -->
        <div class=" max-w-7xl font-semibold ">
            <!-- Card -->
            <div class="bg-white w-full md:rounded-xl md:shadow sm:p-7">
                <div class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 ">
                        Profile
                    </h2>
                    <p class="text-sm text-gray-600 ">
                        Manage your name, password and account settings.
                    </p>
                </div>

                <form>
                    <!-- Grid -->
                    <div class="grid w-full grid-cols-12 gap-y-4 gap-x-2 sm:gap-6">
                        <div class="col-span-3">
                            <label class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Profile photo
                            </label>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <div class="flex items-center gap-5">
                                <img class="inline-block h-16 w-16 rounded-full ring-2 ring-white "
                                    src="../../assets/OIG.jpg" alt="Image Description">
                                <div class="flex gap-x-2">
                                    <div>
                                        <button type="button"
                                            class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border-2  font-medium bg-white text-gray-700 shadow-sm align-middle       transition-all text-sm ">
                                            <span class="material-icons-outlined ">
                                                edit
                                            </span>
                                            Upload photo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-3">
                            <label for="af-account-full-name" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Full name
                            </label>
                            <div class="hs-tooltip inline-block">
                                <button type="button" class="hs-tooltip-toggle ml-1">
                                    <svg class="inline-block w-3 h-3 text-gray-400 " xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path
                                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </button>
                                <span
                                    class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                    role="tooltip">
                                    Displayed on public forums, such as Preline
                                </span>
                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <div class="sm:flex">
                                <input id="af-account-full-name" type="text"
                                    class="py-2 px-3 pr-11 block w-full border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2   "
                                    :value="provider.firstName">
                                <input type="text"
                                    class="py-2 px-3 pr-11 block w-full border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2   "
                                    :value="provider.lastName">
                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-3">
                            <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Email
                            </label>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <input id="af-account-email" type="email"
                                class="py-2 px-3 pr-11 block w-full border-2 border-gray-200 shadow-sm text-sm rounded-lg focus:border-2   "
                                :value="provider.email">
                        </div>
        
                        <div class="col-span-3">
                            <div class="inline-block">
                                <label for="af-account-phone" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                    Phone
                                </label>
                                <span class="text-sm text-error ">
                                    (Optional)
                                </span>
                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <div class="sm:flex">
                                <input id="af-account-phone" type="text"
                                    class="py-2 px-3 pr-11 block w-full  border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2   "
                                    :value="provider.phoneNumber">

                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-3">
                            <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                BIO
                            </label>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <textarea id="af-account-bio"
                                class="py-2 px-3 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-2   "
                                rows="6" value="Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandae ratione fugiat fugit sed tempore expedita eligendi quam officia tempora quae tenetur quia, ab blanditiis doloribus.Asperiores cum mollitia numquam recusandae."></textarea>
                        </div>
                        <!-- End Col -->
                        <div class="col-span-3">
                            <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Address
                            </label>
                        </div>

                        <div class="col-span-9">
                           <div class="sm:flex gap-3">
                                    <select class="py-2 px-3 pr-9 block w-full border-2 border-gray-200 shadow-sm text-sm rounded-lg focus:border-2   ">
                                    <option selected="">City</option>
                                      <option>City 1</option>
                                      <option>City 2</option>
                                      <option>City 3</option>
                                    </select>
                                    <select class="py-2 px-3 pr-9 block w-full border-2 border-gray-200 shadow-sm text-sm rounded-lg focus:border-2   ">
                                    <option selected="">State</option>
                                      <option>State 1</option>
                                      <option>State 2</option>
                                      <option>State 3</option>
                                    </select>
                                  </div>
                        </div>
                        <!-- End Col -->


                        <div class="col-span-3">
                            <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Profession
                            </label>
                        </div>

                        <div class="col-span-9">
                           <div class="sm:flex gap-3">
                                    <select class="py-2 px-3 pr-9 block w-full border-2 border-gray-200 shadow-sm text-sm rounded-lg focus:border-2   ">
                                    <option selected="">Field</option>
                                      <option>Cat 1</option>
                                      <option>Cat 2</option>
                                      <option>Cat 3</option>
                                    </select>
                                    <select class="py-2 px-3 pr-9 block w-full border-2 border-gray-200 shadow-sm text-sm rounded-lg focus:border-2   ">
                                    <option selected="">Profession</option>
                                      <option>Prof 1</option>
                                      <option>Prof 2</option>
                                      <option>Prof 3</option>
                                    </select>
                                  </div>
                        </div>
                    </div>
                    <!-- End Grid -->

                    <div class="mt-5 flex justify-end gap-x-2">
                        <button type="button"
                            class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border-2  font-medium bg-white text-gray-700 shadow-sm align-middle     transition-all text-sm">
                            Cancel
                        </button>
                        <button type="button"
                            class="py-2 px-3 bg-blue-500 inline-flex justify-center items-center gap-2 rounded-md border-2   font-semibold  text-white      transition-all text-sm ">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
            <!-- End Card -->
        </div>
        <!-- End Card Section -->

        <!-- End Container -->
    </ProviderLayout>
</template>

<script>
import ProviderLayout from '../Layouts/ProviderLayout.vue'
import { useThemeStore } from '../../store/AppBasic/themeStore';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';
import { useProviderStore } from '../../store/Provider/providerStore';
import { useNotificationStore } from '../../store/notificationStore';

import { computed, ref } from 'vue';

export default {
    name: 'EditProfile',
    components: {
        ProviderLayout
    },
    setup() {
        //initialisation the store
        const authStore = useAuthStore()
        const providerStore = useProviderStore()
        const userStore = useUserStore()
        const notificationStore = useNotificationStore()
        const router = useRouter()

        //props
        const notSelectedError = ref(false)

        //methods
        const editProfile = () => {
            providerStore.editProfile().then(() => {
                notificationStore.addNotification({
                    type: 'success',
                    message: 'Profile edited successfully'
                })
                router.push('/provider/home')
            }).catch((err) => {
                notificationStore.addNotification({
                    type: 'error',
                    message: err.response.data.message
                })
            })
        }

        const uploadImage = (e) => {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                providerStore.image = reader.result
            }
        }


        const deleteImage = () => {
            providerStore.image = null
        }


        const deleteAccount = () => {
            providerStore.deleteAccount().then(() => {
                notificationStore.addNotification({
                    type: 'success',
                    message: 'Account deleted successfully'
                })
                authStore.logout().then(() => {
                    router.push('/')
                })
            }).catch((err) => {
                notificationStore.addNotification({
                    type: 'error',
                    message: err.response.data.message
                })
            })
        }


        let provider = computed(() => {
            return providerStore.$state.provider
        })



        return {
            // store
            authStore,
            providerStore,
            userStore,
            notificationStore,

            //props
            notSelectedError,

            //methods
            editProfile,
            uploadImage,
            deleteImage,
            deleteAccount,

            //vars
            provider
        }

    }
}

</script>

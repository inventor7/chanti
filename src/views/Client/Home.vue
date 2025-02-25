<template>
    <ClientLayout>
        <!-- Hero Section -->
        <section class="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
            <!-- Background image with overlay -->
            <div class="absolute inset-0 z-0">
                <img src="/wall.svg" class="w-full h-full object-cover" alt="wallpaper" />
                <div class="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-white/20"></div>
            </div>

            <!-- Hero content -->
            <div class="container mx-auto px-4 z-10 flex flex-col items-center justify-center gap-8 py-20">
                <div class="text-center max-w-4xl mx-auto">
                    <h1 v-if="authStore.$state.isAuthenticated == false" 
                        class="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white mb-6 leading-tight">
                        {{ languageStore.getWord('title') }}
                        <span class="text-primary whitespace-nowrap block md:inline">
                            {{ languageStore.getWord('endTitle') }}
                        </span>
                    </h1>
                    <h1 v-else 
                        class="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white mb-6 leading-tight first-letter:uppercase">
                        {{ languageStore.getWord('welcome_back') }}
                        <span class="text-primary block md:inline">
                            {{ authStore.$state.userAuth.lastName.toUpperCase() }}
                        </span>
                    </h1>
                    
                    <p class="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        Connect with skilled professionals and get your tasks done efficiently. Find the perfect match for your needs.
                    </p>
                    
                    <SearchBar componentLocation="home" class="w-full max-w-2xl mx-auto shadow-2xl" />
                    
                    <div v-if="authStore.$state.isAuthenticated === false" class="mt-8">
                        <button @click="handleJoinNetwork" 
                                class="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                            {{ languageStore.getWord('JoinTheChantiTeam') }}
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Wave separator -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" class="w-full">
                    <path fill="#ffffff" fill-opacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
                </svg>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <div class="mb-10 text-center">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ languageStore.getWord('browse_cat') }}</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">Explore our wide range of service categories to find exactly what you need</p>
                </div>
                
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    <Category 
                        v-for="category in categoriesStore.$state.categories" 
                        :key="category.id"
                        @click="selectCategory(category)" 
                        :categoryName="languageStore.getWord(category.name)"
                        :isActive="category === selectedCategory && !clientDemandeStore.$state.requestinProgress"
                        :iconName="category.iconName" 
                        :categoryId="category.id"
                        :class="{ 'bg-primary/10 border-primary text-primary scale-105': category === categoriesStore.selectedCategory && !clientDemandeStore.$state.requestinProgress }"
                        class="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 ease-in-out p-4 flex flex-col items-center justify-center gap-3 hover:scale-105"
                    />
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="mb-12 text-center">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">Simple steps to get your tasks done by skilled professionals</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-xl p-6 shadow-md text-center">
                        <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="material-icons text-primary text-3xl">search</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Search Service</h3>
                        <p class="text-gray-600">Browse categories or search for the specific service you need</p>
                    </div>
                    
                    <div class="bg-white rounded-xl p-6 shadow-md text-center">
                        <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="material-icons text-primary text-3xl">handshake</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Connect</h3>
                        <p class="text-gray-600">Choose from qualified providers and discuss your requirements</p>
                    </div>
                    
                    <div class="bg-white rounded-xl p-6 shadow-md text-center">
                        <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="material-icons text-primary text-3xl">task_alt</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3">Get It Done</h3>
                        <p class="text-gray-600">Receive quality service and rate your experience</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="mb-12 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied customers and service providers</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-gray-50 p-6 rounded-xl">
        <div class="flex items-center mb-4">
          <div class="text-primary">
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
          </div>
        </div>
        <p class="text-gray-700 mb-6">
          "I found an excellent electrician in Algiers through this platform. Fast, reliable service and great quality work. I'll definitely use it again!"
        </p>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h4 class="font-semibold">Amina Bensalah</h4>
            <p class="text-gray-500 text-sm">Homeowner</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 p-6 rounded-xl">
        <div class="flex items-center mb-4">
          <div class="text-primary">
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
          </div>
        </div>
        <p class="text-gray-700 mb-6">
          "As a plumber in Oran, this platform has significantly boosted my client base. The interface is user-friendly and connects me with customers in no time."
        </p>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h4 class="font-semibold">Youssef Haddad</h4>
            <p class="text-gray-500 text-sm">Plumbing Professional</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 p-6 rounded-xl">
        <div class="flex items-center mb-4">
          <div class="text-primary">
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star_half</span>
          </div>
        </div>
        <p class="text-gray-700 mb-6">
          "I needed urgent help with cleaning my home in Constantine and was connected with a professional within hours. Truly excellent service!"
        </p>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h4 class="font-semibold">Fatima Rahmani</h4>
            <p class="text-gray-500 text-sm">Business Owner</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        <!-- Stats Section -->
        <!-- <section class="py-16 bg-secondary text-white">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div class="text-4xl md:text-5xl font-bold mb-2">500+</div>
                        <p class="text-white/80">Service Providers</p>
                    </div>
                    <div>
                        <div class="text-4xl md:text-5xl font-bold mb-2">10k+</div>
                        <p class="text-white/80">Happy Customers</p>
                    </div>
                    <div>
                        <div class="text-4xl md:text-5xl font-bold mb-2">15+</div>
                        <p class="text-white/80">Service Categories</p>
                    </div>
                    <div>
                        <div class="text-4xl md:text-5xl font-bold mb-2">4.8/5</div>
                        <p class="text-white/80">Average Rating</p>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- CTA Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <div class="bg-primary/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p class="text-gray-700 mb-8 max-w-2xl mx-auto">Join our platform today to connect with professionals or find new clients</p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button @click="toggleModalLogin('clientTheme', 'client')" class="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                            I Need a Service
                        </button>
                        <button @click="toggleModalLogin('providerTheme', 'provider')" class="bg-white hover:bg-gray-100 text-primary border border-primary py-3 px-8 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                            I Provide Services
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="mb-12 text-center">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our platform</p>
                </div>
                
                <div class="max-w-3xl mx-auto">
                    <div class="mb-6 border-b border-gray-200 pb-6">
                        <h3 class="text-xl font-semibold mb-2">How do I find a service provider?</h3>
                        <p class="text-gray-600">You can search for providers by category, location, or specific service. Browse through available profiles and reviews to find the best match for your needs.</p>
                    </div>
                    
                    <div class="mb-6 border-b border-gray-200 pb-6">
                        <h3 class="text-xl font-semibold mb-2">How can I become a service provider?</h3>
                        <p class="text-gray-600">Register as a provider, complete your profile with skills and experience, and start receiving service requests from clients in your area.</p>
                    </div>
                    
                    <div class="mb-6 border-b border-gray-200 pb-6">
                        <h3 class="text-xl font-semibold mb-2">Is there a fee to use the platform?</h3>
                        <p class="text-gray-600">Basic membership is free. Premium features are available for a monthly subscription fee. Service providers pay a small commission on completed jobs.</p>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold mb-2">How are service providers vetted?</h3>
                        <p class="text-gray-600">All providers undergo identity verification, skills assessment, and background checks. User reviews and ratings help maintain quality standards.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Keep the original components for functionality -->
        <SearchPage />
        <LoginModal />
        <Modal class="flex flex-col justify-center items-center gap-8 h-full">
            <p class="text-white text-3xl font-semibold">LOGIN AS</p>
            <div class="flex flex-col items-end justify-end w-full px-2 sm:px-10 md:px-20 lg:px-32">
                <label @click="modalStore.toggleModal" class="btn btn-error place text-sm md:text-lg btn-sm md:btn-md btn-circle right-[20%] top-[10%]">✕</label>
            </div>

            <div class="grid grid-cols-2 px-2 items-center bg-transparent gap-8 max-w-lg">
                <Card @click="toggleModalLogin('clientTheme', 'client')" 
                      :title="languageStore.getWord('client')"
                      iconName="person" 
                      class="hover:bg-[#db4024]/100 p-10 sm:p-12 md:p-14 w-full" />
                      
                <Card @click="toggleModalLogin('providerTheme', 'provider')" 
                      :title="languageStore.getWord('provider')"
                      iconName="engineering" 
                      class="hover:bg-[#2c5cc5]/90 p-10 sm:p-12 md:p-14 w-full" />
            </div>
        </Modal>
    </ClientLayout>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import NavClient from '../../components/NavClient.vue'
import Footer from '../../components/Footer.vue'
import ClientLayout from '../Layouts/ClientLayout.vue'
import SearchBar from '../../components/SearchBar.vue'
import SearchPage from '../../components/SearchPage.vue'
import Modal from '../../components/Modal.vue'
import LoginModal from '../../components/LoginModal.vue'
import Card from '../../components/Crad.vue'
import Category from '../../components/Category/Category.vue'
import CategoriesList from '../../components/Category/CategoriesList.vue'
import NotificationPage from '../../components/NotificationPage.vue'
import { useCategoriesStore } from '../../store/categoriesStore'
import { useLanguageStore } from '../../store/AppBasic/languageStore'
import { useModalStore } from '../../store/AppBasic/modaleStore'
import { useThemeStore } from '../../store/AppBasic/themeStore.js'
import { useUserStore } from '../../store/userStore.js'
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { useAuthStore } from '../../store/authStore.js'
import { useRouter } from 'vue-router'
import { computed, watchEffect, ref } from 'vue'

export default {
    name: 'Home',
    components: { 
        ClientLayout, 
        Navbar, 
        NavClient, 
        Modal, 
        CategoriesList, 
        LoginModal, 
        Category, 
        Footer, 
        SearchBar, 
        Card, 
        SearchPage, 
        NotificationPage 
    },
    setup() {
        //initialisation the store
        const languageStore = useLanguageStore()
        const themeStore = useThemeStore()
        const categoriesStore = useCategoriesStore()
        const modalStore = useModalStore()
        const userStore = useUserStore()
        const authStore = useAuthStore()
        const clientDemandeStore = useclientDemandeStore()
        const router = useRouter()

        //props
        const notSelectedError = ref(false)

        const toggleModalLogin = (theme, userType) => {
            modalStore.toggleModalLogin()
            modalStore.toggleModal()
            themeStore.theme = theme
            userStore.user.userType = userType
            userStore.userType = userType
        }

        const selectCategory = (category) => {
            clientDemandeStore.request.categoryId = category.id
            categoriesStore.fetchSubCategories(category)

            //initialisation
            userStore.userType = 'client'
            clientDemandeStore.requestinProgress = true
            router.push({ name: 'services' })
            notSelectedError.value = false
        }

        let selectedCategory = computed(() => {
            return categoriesStore.selectedCategory
        })

        const handleJoinNetwork = () => {
            userStore.$state.userType = 'provider'
            themeStore.theme = 'providerTheme'
            router.push({ name: 'howitworks' })
        }

        return {
            // store
            themeStore,
            modalStore,
            userStore,
            categoriesStore,
            languageStore,
            authStore,
            clientDemandeStore,

            //vars
            selectedCategory,

            //functions
            selectCategory,
            toggleModalLogin,
            handleJoinNetwork
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
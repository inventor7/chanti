<template>
    <ProviderLayout>

        <!-- Provider feed -->
        <ProviderFeed />
    </ProviderLayout>
</template>

<script>

//layout
import ProviderLayout from '../Layouts/ProviderLayout.vue'
//components
import NotificationPage from '../../components/NotificationPage.vue'
import ProviderFeed from '../../components/ProviderFeed.vue'

//store
import { useProviderStore } from '../../store/providerStore'
import { useAuthStore } from '../../store/authStore.js'

//vue
import { ref } from 'vue'



export default {
    name: 'ProviderHome',
    components: { NotificationPage, ProviderLayout,ProviderFeed },
    setup() {
        //initialisation the store
        const authStore = useAuthStore()
        const providerStore = useProviderStore()
       

    
        //props
        const notSelectedError = ref(false)

        const handlegetPost = () => {
            console.log(authStore.$state.userAuth.id)
            providerStore.getPost(authStore.$state.userAuth.id).then((res) => {
                console.log(res.data)
            })
        }


        return {
            // store
            authStore,
            providerStore,
            
            //props
            notSelectedError,

            //methods
            handlegetPost

        }

    }
}
</script>
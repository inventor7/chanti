<template>
    <ProviderLayout>
        <ProviderFeed  />
    </ProviderLayout>
</template>

<script>

//layout
import ProviderLayout from '../Layouts/ProviderLayout.vue'
//components
import NotificationPage from '../../components/NotificationPage.vue'
import ProviderFeed from '../../components/ProviderFeed.vue'

//store
import { useProviderStore } from '../../store/Provider/providerStore'
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

        


        return {
            // store
            authStore,
            providerStore,
            
            //props
            notSelectedError,

        }

    }
}
</script>
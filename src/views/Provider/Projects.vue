<template>
    <ProviderLayout >
      
    </ProviderLayout>
</template>

<script>
//layout
import ProviderLayout from '../Layouts/ProviderLayout.vue';
import  { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
export default {
    name: 'ProviderProjects',
    components: {
        ProviderLayout,
    },
    setup() {
        //store
        const clientDemandeStore = useclientDemandeStore()
        
        //methods

        return {
        };
    },
}

</script>
<template>
    <div v-show="isVisible" class=" box toast toast-top toast-center w-fit whitespace-nowrap ">
        <div 
        class="alert text-white  shadow-lg"
        :class="{
            'bg-success': color === 'success',
            'bg-error': color === 'error',
            'bg-info': color === 'info',
        }"
        >
            <div>
                <span>{{ message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch, reactive, watchEffect } from 'vue';
export default {
    name: 'Toast',
    props: {
        message: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 3000
        },
        isVisible : {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'error'
        }
    },
    setup(props) {
        const isVisible = ref(false)
        const show = () => {
            isVisible.value = true
            setTimeout(() => {
                isVisible.value = false
            }, props.duration)
        }
        watchEffect(() => {
            if (props.isVisible) {
                show()
            }
        })
        return {
            isVisible,
        }
    }
}

</script>

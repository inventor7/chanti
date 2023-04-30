<template>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="alert-modal" class="modal-toggle" />
    <div class="modal bg-black/30 modal-bottom sm:modal-middle">
        <div class="modal-box relative">
            <div
                class="font-bold md:hidden text-lg w-1/2 absolute top-2 h-2 bg-gray-500/20 rounded-full m-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            </div>
            <p class="py-4 font-semibold text-lg ">{{ message }}</p>
            <slot></slot>
            <div class="modal-action"
            :class="{'-ml-2 flex-col-reverse gap-2' : w === 'full'}">
                <label for="alert-modal" class="btn btn-ghost bg-gray-400/30 "
                :class="{'ml-2  w-full' : w === 'full'}"
                >
                    Discard
                </label>
                <label @click="handleCloseBtn" for="alert-modal" class="btn  text-white " :class="{'w-full' : w === 'full',
                        'btn-primary': closeBtnColor === 'primary',
                        'btn-secondary': closeBtnColor === 'secondary',
                        'btn-success': closeBtnColor === 'success',
                        'btn-error': closeBtnColor === 'error',}">
                    {{ closeBtnText }}
                </label>
            </div>
        </div>
    </div>
</template>

<script >
export default {
    name: 'Modal',
    props: {
        //the message to display in the modal
        message: {
            type: String,
            default: ''
        },
        //the text of the close button
        closeBtnText: {
            type: String,
            default: 'Close'
        },
        //the color of the close button
        closeBtnColor: {
            type: String,
            default: 'primary'
        },
        toggleBtnText: {
            type: String,
            default: 'Delete'
        },
        w: {
            type: String,
            default: 'normal'
        },
    },
    emits: ['handleCloseBtn'],
    //reciveing a function from the parent component to the child component exactly in the ok button
    setup(props, context) {
        const handleCloseBtn = () => {
            context.emit('handleCloseBtn');
        }

        return {
            handleCloseBtn
        }
    }
}

</script>

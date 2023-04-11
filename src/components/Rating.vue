<template>
  <div class="px-1  star-rating">
    <span v-for="n in maxStars"><i class="material-icons "
      :style="{ fontSize: size + 'px' }"
      >star_border</i></span>
    <div class="star-rating__current" :style="{ width: getRating + '%' }">
      <span v-for="n in getRating "><i class="material-icons "
        :style="{ fontSize: size + 'px' }"
        >star</i></span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    rating: {
      type: Number,
      default: 0,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
    size: {
      type: Number,
      default: 24,
    },
  },
  setup(props) {
    let maxStars = computed(() => {
      return Array.from({ length: props.maxStars }, (_, i) => i + 1);
    });
    let getRating = computed(() => {
      return (props.rating / props.maxStars) * 100;
    });
    return {
      maxStars,
      getRating,

    };
  },
};
</script>

<style>
.star-rating {
  color: #ff8800;
  display: inline-block;
  position: relative;
 
}



.star-rating__max,
.star-rating__current {
  position: absolute;
  top: 0;
 
 
}

.star-rating__current {
  overflow: hidden;
  white-space: nowrap;
  
}

.star-rating i.material-icons {
  color: #ff8800;
}
</style>

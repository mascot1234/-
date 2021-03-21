Vue.component('List', {
    name: 'List',

    template:   `<div>
                    <transition-group
                        name="drag"
                        :class="['list', 'border-bottom']"
                        tag="ul"
                    >
                        <li v-for="(item, index) in list"
                            @dragenter="dragenter($event, index)"
                            @dragover="dragover($event, index)"
                            @dragstart="dragstart(index)"
                            draggable
                            :key="item"
                            :class="[isDragingItem(index) ? 'draging-list-item' : 'normal-list-item', 'list-item', 'border-top']"
                        >
                            <span :class="[isDragingItem(index) ? 'draging-list-item-index' : 'normal-list-item-index', 'list-item-index']">{{ index + 1 }}</span>
                            <span class="list-item-label">{{ item }}</span>
                            <span :class="[isDragingItem(index) ? 'dragin-menu-icon' : 'menu-icon']"></span>
                        </li>
                    </transition-group>
                </div>`,

    data () {
        return {
            dragIndex: '',
            enterIndex: '',
            isDraging: false 
        }
    },

    props: {
        list: {
            type: Array,
            default () {
                return [];
            }
        }
    },

    methods: {
        dragstart (index) {
          this.dragIndex = index;
          this.isDraging = true;
        },

        isDragingItem (index) {
            return this.dragIndex === index && this.isDraging === true;
        },

        dragenter (e, index) {
            e.preventDefault();

            if (this.dragIndex !== index) {
                if (this.enterIndex !== index) {
                    const source = this.list[this.dragIndex];

                    this.list.splice(this.dragIndex, 1);
                    this.list.splice(index, 0, source);
                    this.isDraging = false;
                } else {
                    this.enterIndex = index;
                }
            }
        },
        
        dragover (e, index) {
          e.preventDefault();
        }
    }
})
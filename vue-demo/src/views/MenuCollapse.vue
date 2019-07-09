<template>
  <div class="menu-collapse-wrap">
      <ul class="menus">
      <li v-for="(item, index) in menu" :key="item.name + index">
        <div class="name title" @click="showMenu(index)">{{item.name}}</div>
        <el-collapse-transition>
          <ul class="child-menu" v-if="menuIndex === index">
            <li v-for="(menuItem, index) in item.children" :key="item.name + index">
              <div class="name">{{menuItem.name}}</div>
            </li>
          </ul>
        </el-collapse-transition>
      </li>
    </ul> 
  </div>
</template>
<script>
export default {
  name: 'MenuCollapse',
  data () {
    return {
      menu: [
        {
          name: '一级标题',
          children: [
            {
              name: '第一',
              children: []
            }, {
              name: '第一',
              children: []
            }, {
              name: '第一',
              children: []
            }, {
              name: '第一',
              children: []
            }, {
              name: '第一',
              children: []
            }, {
              name: '第一',
              children: []
            }
          ]
        },
        {
          name: '二级标题',
          children: [
            {
              name: '第二',
              children: []
            }, {
              name: '第二',
              children: []
            }, {
              name: '第二',
              children: []
            }, {
              name: '第二',
              children: []
            }, {
              name: '第二',
              children: []
            }, {
              name: '第二',
              children: []
            }
          ]
        },
        {
          name: '三级标题',
          children: [
            {
              name: '第三',
              children: []
            }, {
              name: '第三',
              children: []
            }, {
              name: '第三',
              children: []
            }, {
              name: '第三',
              children: []
            }, {
              name: '第三',
              children: []
            }, {
              name: '第三',
              children: []
            }
          ]
        }
      ],
      menuIndex: 0
    }
  },
  methods: {
    showMenu (index) {
      this.menuIndex = index !== this.menuIndex ? index : -1
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    cursor: pointer;
  }
  .collapse-transition {
    transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
  }
</style>

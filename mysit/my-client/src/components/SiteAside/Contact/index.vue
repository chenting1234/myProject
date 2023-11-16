<template>
  <ul class="contact-container">
    <li>
      <a :href="data.github">
        <Icon type="github" />
        <p class="text">{{ data.githubName }}</p>
      </a>
    </li>
    <li>
      <a :href="'mailto:' + data.mail">
        <Icon type="mail" />
        <p class="text">{{ data.mail }}</p>
      </a>
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <Icon type="qq" />
        <p class="text">{{ data.qq }}</p>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" alt="" />
      </div>
    </li>
    <li>
      <a>
        <Icon type="weixin" />
        <p class="text">{{ data.weixin }}</p>
        <div class="pop">
          <img :src="data.weixinQrCode" alt="" />
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.contact-container {
  @itemhight: 30px;
  width: 100%;
  padding: 20px;
  margin: 0;

  li {
    height: @itemhight;
    margin: 14px 0;
    color: @gray;
    position: relative;

    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }

    a {
      display: flex;
      align-items: center;
      cursor: pointer;
      .text {
        font-size: 12px;
      }
    }
  }

  .icon-container {
    font-size: 26px;
    width: 36px;
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: @itemhight;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.2s;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -4px;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
    }
  }
}
</style>

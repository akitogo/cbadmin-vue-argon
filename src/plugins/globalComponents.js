import Badge from "vue-argon-dashboard/src/components/Badge";
import BaseAlert from "vue-argon-dashboard/src/components/BaseAlert";
import BaseButton from "vue-argon-dashboard/src/components/BaseButton";
import BaseCheckbox from "vue-argon-dashboard/src/components/BaseCheckbox";
import BaseInput from "vue-argon-dashboard/src/components/BaseInput";
import BaseDropdown from "vue-argon-dashboard/src/components/BaseDropdown";
import BaseNav from "vue-argon-dashboard/src/components/BaseNav";
import BasePagination from "vue-argon-dashboard/src/components/BasePagination";
import BaseProgress from "vue-argon-dashboard/src/components/BaseProgress";
import BaseRadio from "vue-argon-dashboard/src/components/BaseRadio";
import BaseSlider from "vue-argon-dashboard/src/components/BaseSlider";
import BaseSwitch from "vue-argon-dashboard/src/components/BaseSwitch";
import BaseTable from "vue-argon-dashboard/src/components/BaseTable";
import BaseHeader from "vue-argon-dashboard/src/components/BaseHeader";
import Card from "vue-argon-dashboard/src/components/Card";
import StatsCard from "vue-argon-dashboard/src/components/StatsCard";
import Modal from "vue-argon-dashboard/src/components/Modal";
import TabPane from "vue-argon-dashboard/src/components/Tabs/TabPane";
import Tabs from "vue-argon-dashboard/src/components/Tabs/Tabs";
import Overlay from "../components/Overlay";

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseNav.name, BaseNav);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(BaseTable.name, BaseTable);
    Vue.component(BaseHeader.name, BaseHeader);
    Vue.component(Card.name, Card);
    Vue.component(StatsCard.name, StatsCard);
    Vue.component(Modal.name, Modal);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Overlay.name, Overlay);
  }
};

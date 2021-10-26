import BaseButton from "../components/BaseButton";
import BaseCheckbox from "../components/BaseCheckbox";
import BaseInput from "../components/BaseInput";
import BaseDropdown from "../components/BaseDropdown";
import BaseNav from "../components/BaseNav";
import BaseHeader from "../components/BaseHeader";
import Card from "../components/Card";
import StatsCard from "../components/StatsCard";
import Overlay from "../components/Overlay";

export default {
  install(Vue) {
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseNav.name, BaseNav);
    Vue.component(BaseHeader.name, BaseHeader);
    Vue.component(Card.name, Card);
    Vue.component(StatsCard.name, StatsCard);
    Vue.component(Overlay.name, Overlay);
  }
};
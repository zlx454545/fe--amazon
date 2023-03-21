import SubMenuContainer from "./SubMenuContainer";
import { DimmedBody } from "./Dimmed";

export default class SideBar {
  constructor() {
    this.subMenuContainer = new SubMenuContainer();
    this.subMenuContainer.init();

    this.dimmedBody = new DimmedBody();

    this.showAllAnchor = document.querySelector(".nav__anchor--all");
    this.sideBar = document.querySelector(".side-bar");
    this.sideBarCloseButton = document.querySelector(".side-bar__close");

    this.showOthersButton = document.querySelector(".side-bar__show-all");
    this.closeOthersButton = document.querySelector(
      ".side-bar__button--close-others"
    );
    this.otherButtonContainer = document.querySelector(
      ".other-buttons-container__items"
    );

    this.sideBarContent = document.querySelector(".side-bar__content");
    this.sideBarParentButtons = document.querySelectorAll(
      ".side-bar__button--parent"
    );

    [...this.sideBarParentButtons].forEach((el, idx) => {
      el.setAttribute("data-id", `${idx + 1}`);
    });

    this.allSubMenus = document.querySelectorAll(".submenu");
    this.subMenuBack = document.querySelector(".submenu__back");
  }

  handleClickShowAllAnchor(e) {
    e.preventDefault();

    this.dimmedBody.showDimmedBody();
    this.sideBar.classList.add("show-side-bar");
  }

  handleClickSideBarCloseButton() {
    this.dimmedBody.hideDimmedBody();
    this.sideBar.classList.remove("show-side-bar");
  }

  handleClickShowOthersButton() {
    this.otherButtonContainer.classList.add("show-others");
  }

  handleClickHideOthersButton() {
    this.otherButtonContainer.classList.remove("show-others");
  }

  handleClickParentButton({ target }) {
    const parentButton = [...this.sideBarParentButtons].find((el) =>
      el.contains(target)
    );

    if (!parentButton) return;

    const {
      dataset: { id },
    } = parentButton;

    this.allSubMenus.forEach((el) => el.classList.add("hidden"));
    const subMenu = [...this.allSubMenus].find(
      (el) => el.dataset.parentId === id
    );

    subMenu.classList.remove("hidden");
    this.subMenuContainer.subMenuContainer.classList.add("show-sub-menu");
  }

  handleClickSubMenuBackButton() {
    this.subMenuContainer.subMenuContainer.classList.remove("show-sub-menu");
  }

  onSideBar() {
    this.showAllAnchor.addEventListener("click", (e) => {
      this.handleClickShowAllAnchor(e);
    });
    this.sideBarCloseButton.addEventListener("click", () => {
      this.handleClickSideBarCloseButton();
    });
    this.showOthersButton.addEventListener("click", () => {
      this.handleClickShowOthersButton();
    });
    this.closeOthersButton.addEventListener("click", () => {
      this.handleClickHideOthersButton();
    });
    this.sideBarContent.addEventListener("click", (e) => {
      this.handleClickParentButton(e);
    });
    this.subMenuBack.addEventListener("click", () => {
      this.handleClickSubMenuBackButton();
    });
  }
}

import { DimmedBody } from "./Dimmed";

export default class SideBar {
  constructor() {
    this.allAnchor = document.querySelector(".nav__anchor--all");
    this.sideBar = document.querySelector(".side-bar");
    this.sideBarCloseButton = document.querySelector(".side-bar__close");

    this.showAllButton = document.querySelector(".side-bar__show-all");
    this.otherButtonContainer = document.querySelector(
      ".other-buttons-container__items"
    );
    this.closeAllButton = document.querySelector(
      ".side-bar__button--close-others"
    );

    this.sideBarContent = document.querySelector(".side-bar__content");
    this.sideBarParentButtons = document.querySelectorAll(
      ".side-bar__button--parent"
    );
    this.subMenus = document.querySelector(".submenus");
    this.allSubMenus = document.querySelectorAll(".submenu");
    this.allSubMenuBacks = document.querySelectorAll(".submenu__back");

    this.dimmedBody = new DimmedBody();
  }

  showSideBar = (e) => {
    e.preventDefault();

    this.dimmedBody.showDimmedBody();
    this.sideBar.classList.remove("hidden");
    this.sideBar.classList.remove("hide-side-bar");
    this.sideBar.classList.add("show-side-bar");
  };

  hideSideBar = () => {
    this.dimmedBody.hideDimmedBody();
    this.sideBar.classList.remove("show-side-bar");
    this.sideBar.classList.add("hide-side-bar");
  };

  unfoldOtherButtons = () => {
    this.otherButtonContainer.classList.remove("hidden");
    this.otherButtonContainer.classList.remove("hide-others");
    this.otherButtonContainer.classList.add("show-others");
  };

  foldOtherButtons = () => {
    this.otherButtonContainer.classList.remove("show-others");
    this.otherButtonContainer.classList.add("hide-others");
  };

  showSubMenu = (e) => {
    if (this.subMenus.contains(e.target)) return;

    const parentButton = [...this.sideBarParentButtons].find((el) =>
      el.contains(e.target)
    );
    const id = parentButton?.dataset.id;
    if (!id) return;

    const subMenu = [...this.allSubMenus].find(
      (el) => el.dataset.parentId === id
    );

    subMenu?.classList.remove("hide-sub-menu");
    subMenu?.classList.add("show-sub-menu");
  };

  hideSubMenu = (subMenuBack) => {
    subMenuBack.parentElement.classList.remove("show-sub-menu");
    subMenuBack.parentElement.classList.add("hide-sub-menu");
  };

  setSideBar = () => {
    this.allAnchor.addEventListener("click", (e) => {
      this.showSideBar(e);
    });
    this.sideBarCloseButton.addEventListener("click", this.hideSideBar);
    this.showAllButton.addEventListener("click", this.unfoldOtherButtons);
    this.closeAllButton.addEventListener("click", this.foldOtherButtons);
    this.sideBarContent.addEventListener("click", (e) => {
      this.showSubMenu(e);
    });
    [...this.allSubMenuBacks].forEach((subMenuBack) => {
      subMenuBack.addEventListener("click", () =>
        this.hideSubMenu(subMenuBack)
      );
    });
  };
}
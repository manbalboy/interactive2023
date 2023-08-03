// 즉시실행함수 전역변수 사용하지 않도록
(() => {
  let yOffset = 0;
  let prevScrollHeight = 0; // 현재 스크롤 위치 (yOffset/ scrollY) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬 (scroll-section)

  // 스크롤 인터렉티브에 필요한 정보
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이에 5배로 scrollHeight 세팅
      scrollHeight: 0, // section 의 스크롤 길이 동적 세팅하기위해 기본값 set
      objs: {
        container: document.querySelector("#scroll-section-0"), // scene 의 컨테이너
      },
    },

    {
      // 1
      type: "nomal",
      heightNum: 5, // 브라우저 높이에 5배로 scrollHeight 세팅
      scrollHeight: 0, // section 의 스크롤 길이 동적 세팅하기위해 기본값 set
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },

    {
      // 2
      type: "sticky",
      heightNum: 5, // 브라우저 높이에 5배로 scrollHeight 세팅
      scrollHeight: 0, // section 의 스크롤 길이 동적 세팅하기위해 기본값 set
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },

    {
      // 3
      type: "sticky",
      heightNum: 5, // 브라우저 높이에 5배로 scrollHeight 세팅
      scrollHeight: 0, // section 의 스크롤 길이 동적 세팅하기위해 기본값 set
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  // 디바이스별 section 스크롤 높이 동적 셋팅
  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    yOffset = window.scrollY;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) {
        return;
      }
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

   

    console.log(currentScene);
  };

  // 이벤트 등록
  window.addEventListener("scroll", () => {
    yOffset = window.scrollY;
    scrollLoop();
  });

  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
  // window.addEventListener("DomContentLoaded", setLayout);
})();

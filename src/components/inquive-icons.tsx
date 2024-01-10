import { PersonIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Icons = {
  userIcon: PersonIcon,
  User: ({ className, ...props }: AvatarProps) => {
    const { user, isLoading } = useKindeBrowserClient();

    return (
      <>
        {isLoading || !user || !user.id || !user.picture ? (
          <PersonIcon className={cn("h-4 w-4", className)} />
        ) : (
          <Avatar {...props} className={cn("h-full w-full", className)}>
            <div className="relative aspect-square h-full w-full">
              <Image
                fill
                src={user.picture}
                alt="profile picture"
                referrerPolicy="no-referrer"
              />
            </div>
            <AvatarFallback>{user.given_name?.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
      </>
    );
  },
  logo: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="1080"
      height="1080"
    >
      <path
        d="M0 0 C0.9471488 -0.00322445 1.8942976 -0.00644889 2.87014788 -0.00977105 C4.44175401 -0.00744815 4.44175401 -0.00744815 6.04510975 -0.00507832 C7.15260588 -0.00734387 8.26010201 -0.00960943 9.40115863 -0.01194364 C13.13753266 -0.01830817 16.87387065 -0.0174527 20.61024952 -0.01662922 C23.27895717 -0.01961924 25.94766194 -0.0229928 28.61636829 -0.02680683 C35.12894949 -0.03512581 41.64152165 -0.03786226 48.15410771 -0.03841921 C53.44814759 -0.03889393 58.74218448 -0.04094646 64.03622341 -0.04411983 C79.04075672 -0.05293101 94.04528286 -0.05753867 109.04981878 -0.05678936 C109.8593117 -0.0567494 110.66880463 -0.05670945 111.50282764 -0.05666828 C112.31330769 -0.0566274 113.12378773 -0.05658652 113.95882777 -0.0565444 C127.08749923 -0.05613814 140.21614198 -0.06570138 153.34480514 -0.07980665 C166.82030219 -0.0941704 180.29578523 -0.10107678 193.77129012 -0.10021287 C201.33862635 -0.09988083 208.9059325 -0.10263098 216.47326183 -0.11339092 C222.91826547 -0.12249607 229.36322541 -0.12467118 235.80823269 -0.1178815 C239.0961567 -0.11461592 242.38397947 -0.11564731 245.67189884 -0.12323475 C249.23835358 -0.1309323 252.80458762 -0.12632443 256.37103748 -0.11860371 C257.40762129 -0.12374727 258.4442051 -0.12889083 259.51220053 -0.13419026 C264.91435425 -0.10831677 269.41827816 0.33462265 274.52553272 2.12863445 C274.55021918 6.79171644 274.56838621 11.45476054 274.58046436 16.11789227 C274.5854986 17.70481307 274.59232641 19.29172922 274.60097218 20.87863445 C274.61307754 23.15729195 274.61877005 25.43588821 274.62318897 27.71457195 C274.62835026 28.4260841 274.63351154 29.13759624 274.63882923 29.87066936 C274.63940443 34.90089104 274.63940443 34.90089104 273.52553272 37.12863445 C271.10805225 37.61520672 271.10805225 37.61520672 267.90834522 37.9450407 C266.74303272 38.06943523 265.57772022 38.19382977 264.37709522 38.32199383 C263.1473296 38.44381023 261.91756397 38.56562664 260.65053272 38.69113445 C259.45943897 38.81681805 258.26834522 38.94250164 257.04115772 39.07199383 C249.87504251 39.82075094 242.70280803 40.49642496 235.52553272 41.12863445 C235.52553272 41.78863445 235.52553272 42.44863445 235.52553272 43.12863445 C233.92403386 43.80168463 232.31922243 44.46685672 230.71303272 45.12863445 C229.81971241 45.49988445 228.9263921 45.87113445 228.00600147 46.25363445 C225.52553272 47.12863445 225.52553272 47.12863445 222.52553272 47.12863445 C222.15428272 48.05675945 222.15428272 48.05675945 221.77553272 49.00363445 C220.52553272 51.12863445 220.52553272 51.12863445 218.58803272 52.06613445 C215.80946274 53.49751899 215.03530545 55.45221916 213.52553272 58.12863445 C212.53553272 58.62363445 212.53553272 58.62363445 211.52553272 59.12863445 C206.35084228 66.47669488 204.19141373 74.29659707 202.28725147 82.91769695 C201.52553272 86.12863445 201.52553272 86.12863445 200.52553272 87.12863445 C200.13925053 89.83864544 199.8124216 92.53267279 199.52553272 95.25363445 C199.44303272 95.98195477 199.36053272 96.71027508 199.27553272 97.4606657 C197.83893699 110.68183581 197.37741871 123.8170052 197.39181995 137.1016264 C197.38994709 138.76317478 197.38764452 140.42472272 197.38495463 142.08626997 C197.3788887 146.6103553 197.37896403 151.134422 197.38014901 155.65851045 C197.38035435 160.5544791 197.37482154 165.45044198 197.37009144 170.34640789 C197.36181245 179.92398645 197.35903783 189.50155886 197.35847906 199.07914071 C197.3580025 206.87271496 197.35594075 214.66628719 197.35277843 222.4598608 C197.34397859 244.6009595 197.33935789 266.74205338 197.34010891 288.88315384 C197.34014886 290.07485092 197.34018882 291.266548 197.34022999 292.49435711 C197.34029131 294.28410924 197.34029131 294.28410924 197.34035387 296.11001797 C197.34075992 315.42709771 197.33119883 334.74415792 197.31709162 354.06123202 C197.30268997 373.93987714 197.29582355 393.81851276 197.2966854 413.69716322 C197.29701611 424.83968692 197.29432463 435.98219016 197.28350735 447.12470913 C197.27435223 456.6152797 197.27226782 466.10582053 197.27901677 475.59639363 C197.28225717 480.42785155 197.2824298 485.25925259 197.27366352 490.09070492 C196.10578375 528.20733855 196.10578375 528.20733855 203.52553272 565.12863445 C203.83748585 565.98199383 204.14943897 566.8353532 204.47084522 567.71457195 C206.36050271 572.66934317 208.49168095 576.79456049 211.52553272 581.12863445 C211.52553272 581.78863445 211.52553272 582.44863445 211.52553272 583.12863445 C212.08240772 583.35550945 212.63928272 583.58238445 213.21303272 583.81613445 C216.15849772 585.48788485 218.16877457 587.7114466 220.52553272 590.12863445 C221.51553272 590.78863445 222.50553272 591.44863445 223.52553272 592.12863445 C223.52553272 592.78863445 223.52553272 593.44863445 223.52553272 594.12863445 C224.28865772 594.23175945 225.05178272 594.33488445 225.83803272 594.44113445 C230.81994136 595.36996488 235.65191267 596.74979889 240.52553272 598.12863445 C240.52553272 598.78863445 240.52553272 599.44863445 240.52553272 600.12863445 C241.39049366 600.17761883 242.2554546 600.2266032 243.14662647 600.27707195 C246.69212068 600.48755165 250.2360289 600.71348129 253.77992725 600.94894695 C255.75458969 601.07817971 257.72956899 601.20260381 259.70473194 601.32394695 C263.1044413 601.53615248 266.50235063 601.76833635 269.90053272 602.00363445 C271.01226856 602.06986004 272.1240044 602.13608562 273.26942921 602.20431805 C274.31042774 602.27988934 275.35142628 602.35546062 276.42397022 602.43332195 C277.35902393 602.49503582 278.29407764 602.55674969 279.25746632 602.62033367 C281.52553272 603.12863445 281.52553272 603.12863445 283.52553272 606.12863445 C283.78432178 609.17550945 283.78432178 609.17550945 283.79115772 612.87863445 C283.79307117 613.53315594 283.79498463 614.18767742 283.79695606 614.86203289 C283.79831517 616.24387275 283.79463785 617.62572549 283.78627491 619.0075407 C283.77557081 621.12111405 283.78617874 623.2338375 283.79897022 625.34738445 C283.79764858 626.69113633 283.79508608 628.03488767 283.79115772 629.37863445 C283.78890186 630.6006657 283.786646 631.82269695 283.78432178 633.08175945 C283.52553272 636.12863445 283.52553272 636.12863445 281.52553272 639.12863445 C279.37917507 639.50122994 279.37917507 639.50122994 276.65669537 639.49777794 C275.10409458 639.50673766 275.10409458 639.50673766 273.52012813 639.51587838 C272.37423312 639.50713986 271.22833811 639.49840133 270.047719 639.489398 C268.83727865 639.49196128 267.6268383 639.49452455 266.37971795 639.4971655 C263.00917743 639.50126595 259.63915465 639.4918401 256.26867652 639.47683132 C252.6381391 639.46391521 249.00761862 639.46825726 245.3770647 639.47053814 C239.08336413 639.47211369 232.78975661 639.46267518 226.49607944 639.44582462 C217.39641547 639.4214772 208.29679665 639.41363373 199.19710363 639.40986065 C184.43464691 639.40328946 169.67223983 639.38331024 154.90981007 639.35495281 C140.56671364 639.32742948 126.22363068 639.30618746 111.88051319 639.29342937 C110.99688795 639.2926412 110.1132627 639.29185303 109.20286094 639.29104098 C104.7701172 639.28712596 100.33737337 639.28333481 95.90462947 639.27960527 C59.11156076 639.24848859 22.31855384 639.19481093 -14.47446728 639.12863445 C-14.47446728 627.24863445 -14.47446728 615.36863445 -14.47446728 603.12863445 C-8.84384228 602.63363445 -3.21321728 602.13863445 2.58803272 601.62863445 C4.35155079 601.47201336 6.11506886 601.31539227 7.93202686 601.15402508 C9.34989347 601.0307392 10.76777961 600.90767767 12.18568897 600.78488445 C12.9055901 600.72010906 13.62549122 600.65533367 14.36720753 600.58859539 C18.77224365 600.21057084 23.10415563 600.06775491 27.52553272 600.12863445 C27.52553272 599.46863445 27.52553272 598.80863445 27.52553272 598.12863445 C29.25409731 597.64730036 30.98341344 597.16866474 32.71303272 596.69113445 C34.15742725 596.29088055 34.15742725 596.29088055 35.63100147 595.8825407 C38.25216969 595.19983427 40.86446773 594.6297125 43.52553272 594.12863445 C43.52553272 593.46863445 43.52553272 592.80863445 43.52553272 592.12863445 C44.57740772 591.59238445 45.62928272 591.05613445 46.71303272 590.50363445 C51.59912631 587.71017084 54.3596432 584.11496475 57.21303272 579.25363445 C57.64615772 578.55238445 58.07928272 577.85113445 58.52553272 577.12863445 C59.18553272 577.12863445 59.84553272 577.12863445 60.52553272 577.12863445 C60.63510303 576.56015789 60.74467335 575.99168133 60.85756397 575.4059782 C61.01611866 574.63382977 61.17467335 573.86168133 61.33803272 573.06613445 C61.48885303 572.31203289 61.63967335 571.55793133 61.79506397 570.7809782 C62.52553272 568.12863445 62.52553272 568.12863445 64.00209522 564.8044157 C65.57269518 561.01483992 66.44994291 557.40289778 67.08803272 553.37863445 C67.21097706 552.63363689 67.33392139 551.88863934 67.46059132 551.12106609 C68.7896375 542.43362107 69.33158691 533.67062905 69.87929249 524.90500164 C69.95075489 523.78126141 70.02221729 522.65752117 70.09584522 521.4997282 C70.15530323 520.48837811 70.21476124 519.47702801 70.276021 518.43503094 C70.52553272 516.12863445 70.52553272 516.12863445 71.52553272 515.12863445 C71.62434352 513.06543603 71.65108985 510.99878595 71.65137386 508.93322277 C71.65355402 507.94677535 71.65355402 507.94677535 71.65577823 506.94039971 C71.65946374 504.70929885 71.6559401 502.47826523 71.65251637 500.24716473 C71.65366718 498.64246666 71.65525443 497.03776886 71.65724361 495.43307161 C71.66144241 491.00204228 71.65934378 486.57103431 71.65625739 482.14000487 C71.65400574 477.36967777 71.65748173 472.59935449 71.66023731 467.82902813 C71.66469653 458.47549075 71.66371787 449.12196137 71.66082467 439.76842368 C71.65857123 432.1702468 71.65825786 424.57207218 71.65934849 416.97389507 C71.65957834 415.35510811 71.65957834 415.35510811 71.65981283 413.70361838 C71.66013254 411.51163264 71.66045675 409.3196469 71.66078542 407.12766117 C71.66364066 386.54730714 71.66035251 365.96695755 71.65498506 345.38660425 C71.65051698 327.70702485 71.6512929 310.02745202 71.65590382 292.34787273 C71.66124881 271.84387145 71.66336596 251.33987406 71.66029155 230.83587217 C71.65997299 228.65170606 71.65965861 226.46753995 71.65934849 224.28337383 C71.65919421 223.20857064 71.65903994 222.13376744 71.65888099 221.02639446 C71.65801561 213.43259977 71.65947916 205.83880754 71.66182804 198.24501324 C71.66462541 188.99753028 71.66388912 179.75005582 71.6585473 170.50257385 C71.65590943 165.77951679 71.65490666 161.05647391 71.65819645 156.33341694 C71.66115767 152.01697473 71.65956954 147.70055997 71.6542189 143.38412029 C71.65309396 141.81550239 71.65368757 140.24688221 71.65609469 138.67826575 C71.65909782 136.56015869 71.65605511 134.44214799 71.65137386 132.32404613 C71.65121151 131.14327826 71.65104916 129.96251039 71.65088189 128.74596167 C71.82306589 126.20201055 71.82306589 126.20201055 70.52553272 125.12863445 C70.3322972 123.35472475 70.20123171 121.57398561 70.09584522 119.79269695 C69.98889332 118.11542522 69.98889332 118.11542522 69.87978077 116.40426922 C69.76630299 114.59720501 69.76630299 114.59720501 69.65053272 112.75363445 C68.34075781 90.44573803 68.34075781 90.44573803 61.51381397 69.37863445 C60.52553272 67.12863445 60.52553272 67.12863445 60.52553272 64.12863445 C59.86553272 64.12863445 59.20553272 64.12863445 58.52553272 64.12863445 C57.96865772 63.07675945 57.41178272 62.02488445 56.83803272 60.94113445 C54.24107946 56.41475464 51.21842037 53.14436704 46.71303272 50.44113445 C45.99115772 50.00800945 45.26928272 49.57488445 44.52553272 49.12863445 C44.52553272 48.46863445 44.52553272 47.80863445 44.52553272 47.12863445 C43.83846241 46.92367352 43.1513921 46.71871258 42.44350147 46.5075407 C41.54244678 46.23812664 40.6413921 45.96871258 39.71303272 45.69113445 C38.81971241 45.42429852 37.9263921 45.15746258 37.00600147 44.8825407 C35.17080218 44.32475572 33.34519546 43.7351887 31.52553272 43.12863445 C31.52553272 42.46863445 31.52553272 41.80863445 31.52553272 41.12863445 C30.81010303 41.07965008 30.09467335 41.0306657 29.35756397 40.98019695 C22.76683487 40.48567912 16.31255854 39.66456257 9.79115772 38.6012907 C5.46924997 37.97575142 1.14752204 37.65412853 -3.20884228 37.3747282 C-5.47446728 37.12863445 -5.47446728 37.12863445 -6.47446728 36.12863445 C-6.56298257 33.53504124 -6.58972673 30.96823754 -6.57212353 28.3747282 C-6.57070858 27.59928158 -6.56929363 26.82383495 -6.56783581 26.02488995 C-6.56222073 23.53859951 -6.54966574 21.05239785 -6.53696728 18.56613445 C-6.53195422 16.88449512 -6.52739097 15.20285439 -6.5232954 13.52121258 C-6.51224641 9.39031879 -6.49497172 5.25949169 -6.47446728 1.12863445 C-4.09538566 -0.06090635 -2.65510079 0.00227611 0 0 Z "
        fill="#000000"
        transform="translate(110.47446727752686,192.87136554718018)"
      />
      <path
        d="M0 0 C0.96354918 -0.00521549 1.92709836 -0.01043099 2.919846 -0.01580453 C4.51889053 -0.00911236 4.51889053 -0.00911236 6.15023899 -0.002285 C7.27689159 -0.00540498 8.4035442 -0.00852497 9.56433779 -0.01173949 C13.36536763 -0.01976025 17.16623963 -0.01337996 20.96727085 -0.00710678 C23.68187894 -0.00871397 26.39648018 -0.013302 29.11108494 -0.0177269 C35.73463312 -0.02663886 42.35813607 -0.02469081 48.98168605 -0.01890162 C54.36348209 -0.01439182 59.74526541 -0.01376926 65.1270628 -0.01594925 C66.27435663 -0.01640895 66.27435663 -0.01640895 67.44482811 -0.01687793 C68.99845985 -0.01751736 70.55209159 -0.01816579 72.10572333 -0.01882312 C86.68826709 -0.02453179 101.27078573 -0.01796031 115.85332537 -0.00722238 C128.37406718 0.00171183 140.8947719 0.0001632 153.41551304 -0.00905991 C167.94297143 -0.01975615 182.47040778 -0.02398053 196.99786955 -0.01783538 C198.5462135 -0.01719826 200.09455746 -0.01656952 201.64290142 -0.01594925 C202.40478374 -0.0156407 203.16666606 -0.01533215 203.95163573 -0.01501425 C209.32834773 -0.01328523 214.70504579 -0.01620689 220.08175564 -0.02090836 C226.63227979 -0.0265101 233.18275599 -0.02501575 239.73327463 -0.01434687 C243.07742076 -0.00908029 246.42142039 -0.00812146 249.76557636 -0.01364517 C253.38598428 -0.01907555 257.00616413 -0.01229691 260.62655735 -0.002285 C261.69035632 -0.00674645 262.75415528 -0.01120789 263.85019058 -0.01580453 C264.81634751 -0.01058903 265.78250443 -0.00537354 266.77793884 0 C268.03223762 0.00048706 268.03223762 0.00048706 269.31187576 0.00098395 C271.45188999 0.25168228 271.45188999 0.25168228 274.45188999 2.25168228 C274.73138466 4.86457456 274.82417547 7.23747664 274.78001499 9.84933853 C274.77814182 10.59880249 274.77626865 11.34826645 274.77433872 12.12044144 C274.76761367 13.70500511 274.75369009 15.28955205 274.73313999 16.87399673 C274.70196929 19.30799033 274.692169 21.74133698 274.68626499 24.17551041 C274.67709588 25.71262773 274.6667204 27.24973843 274.65501499 28.78683853 C274.65076511 29.51911163 274.64651524 30.25138474 274.64213657 31.00584793 C274.56904872 36.13452355 274.56904872 36.13452355 273.45188999 37.25168228 C272.10797655 37.45443508 270.75511183 37.59868002 269.40110874 37.71652603 C268.56265415 37.79338638 267.72419956 37.87024673 266.86033726 37.94943619 C265.96242466 38.0285524 265.06451206 38.10766861 264.13938999 38.18918228 C257.31736624 38.82263429 250.59747347 39.59494318 243.86204624 40.88449478 C241.35600562 41.26629027 238.98285754 41.31506966 236.45188999 41.25168228 C236.45188999 41.91168228 236.45188999 42.57168228 236.45188999 43.25168228 C235.62044468 43.50562759 234.78899937 43.75957291 233.93235874 44.02121353 C232.84567905 44.36539322 231.75899937 44.70957291 230.63938999 45.06418228 C229.56044468 45.40062759 228.48149937 45.73707291 227.36985874 46.08371353 C224.57094641 47.20402784 223.3616757 48.01181016 221.45188999 50.25168228 C220.64751499 50.89105728 219.84313999 51.53043228 219.01438999 52.18918228 C214.49346614 55.82797465 211.87446201 58.92202384 209.45188999 64.25168228 C208.79188999 64.25168228 208.13188999 64.25168228 207.45188999 64.25168228 C207.34231968 64.83176041 207.23274937 65.41183853 207.11985874 66.00949478 C206.96130405 66.79066666 206.80274937 67.57183853 206.63938999 68.37668228 C206.41315952 69.52523697 206.41315952 69.52523697 206.18235874 70.69699478 C205.45188999 73.25168228 205.45188999 73.25168228 203.97923374 75.94699478 C201.99375464 80.24294189 201.44300451 84.33881561 200.82688999 89.00168228 C200.70571812 89.84472916 200.58454624 90.68777603 200.45970249 91.55636978 C198.94722092 102.30814095 198.22551353 112.98550875 197.84642124 123.83176041 C197.79034702 125.24811783 197.79034702 125.24811783 197.73313999 126.69308853 C197.70284702 127.54588394 197.67255405 128.39867935 197.64134312 129.27731705 C197.45188999 131.25168228 197.45188999 131.25168228 196.45188999 132.25168228 C196.35314012 134.27319742 196.32633298 136.29822938 196.32604885 138.322155 C196.32386869 139.28834193 196.32386869 139.28834193 196.32164448 140.27404779 C196.31795914 142.45920189 196.32148254 144.64428734 196.32490635 146.82944107 C196.32375553 148.40114074 196.32216827 149.97284014 196.3201791 151.54453897 C196.3159804 155.88435587 196.3180789 160.22415094 196.32116532 164.56396794 C196.32341701 169.23613465 196.31994097 173.90829746 196.3171854 178.58046341 C196.31272622 187.7414931 196.31370483 196.90251462 196.31659804 206.06354463 C196.3188515 213.50535231 196.31916485 220.94715769 196.31807423 228.38896561 C196.31784438 229.97444824 196.31784438 229.97444824 196.31760988 231.59196082 C196.31729018 233.73885055 196.31696596 235.88574029 196.31663729 238.03263003 C196.31378207 258.18950311 196.31707019 278.34637165 196.32243766 298.50324398 C196.32690574 315.81896918 196.32612982 333.13468767 196.3215189 350.45041275 C196.31617388 370.53251236 196.31405676 390.61460798 196.31713116 410.6967082 C196.31744973 412.83593845 196.3177641 414.9751687 196.31807423 417.11439896 C196.3182285 418.16708927 196.31838278 419.21977958 196.31854173 420.3043696 C196.3194071 427.74187099 196.31794357 435.17936987 196.31559467 442.61687088 C196.31279728 451.67404533 196.31353364 460.73121111 196.31887542 469.78838456 C196.32151326 474.41422893 196.32251611 479.04005881 196.31922626 483.66590309 C196.31626499 487.89352521 196.31785327 492.1211193 196.32320382 496.34873885 C196.32432873 497.88505548 196.32373521 499.42137443 196.32132803 500.95768958 C196.31832476 503.0322308 196.32136775 505.10667365 196.32604885 507.18120956 C196.3262112 508.33767534 196.32637356 509.49414111 196.32654083 510.6856513 C196.16061995 513.18433357 196.16061995 513.18433357 197.45188999 514.25168228 C197.64581174 516.32960506 197.77645786 518.41347313 197.88157749 520.49777603 C197.95287876 521.80190445 198.02418003 523.10603287 198.09764194 524.44968033 C198.13459171 525.14233994 198.17154148 525.83499954 198.20961094 526.54864883 C199.29049916 550.4002557 199.29049916 550.4002557 206.46360874 572.96652603 C207.45188999 575.25168228 207.45188999 575.25168228 207.45188999 578.25168228 C208.44188999 578.58168228 209.43188999 578.91168228 210.45188999 579.25168228 C210.88501499 579.99418228 211.31813999 580.73668228 211.76438999 581.50168228 C214.39668245 585.79134406 218.02391215 588.41352138 222.32688999 590.93918228 C223.02813999 591.37230728 223.72938999 591.80543228 224.45188999 592.25168228 C224.45188999 592.91168228 224.45188999 593.57168228 224.45188999 594.25168228 C225.02036655 594.37285416 225.58884312 594.49402603 226.17454624 594.61886978 C230.99434464 595.66490282 235.72518339 596.84372712 240.45188999 598.25168228 C240.45188999 598.91168228 240.45188999 599.57168228 240.45188999 600.25168228 C241.38903843 600.30066666 242.32618687 600.34965103 243.29173374 600.40011978 C256.36546204 601.11335203 269.40255535 602.18206469 282.45188999 603.25168228 C282.45188999 615.13168228 282.45188999 627.01168228 282.45188999 639.25168228 C244.77728772 639.29685702 207.10269253 639.33268093 169.42806865 639.35381294 C164.98434889 639.35631448 160.54062919 639.35890311 156.09690952 639.36154556 C154.7698635 639.36233249 154.7698635 639.36233249 153.41600846 639.36313532 C139.07459543 639.37184761 124.73319836 639.38762209 110.39179482 639.40598787 C95.68580478 639.42466405 80.97982312 639.43579416 66.27382171 639.43985927 C57.19301895 639.44260908 48.11226131 639.45130675 39.03147243 639.46751522 C32.81185474 639.47805396 26.59226052 639.48129 20.37263454 639.47868504 C16.779533 639.47739887 13.18651052 639.47942652 9.59342289 639.49009323 C5.70548671 639.50155152 1.81765501 639.49768016 -2.07029629 639.49219131 C-3.78913881 639.50092984 -3.78913881 639.50092984 -5.54270542 639.5098449 C-7.0953062 639.50387175 -7.0953062 639.50387175 -8.67927265 639.49777794 C-10.0269001 639.4989171 -10.0269001 639.4989171 -11.40175235 639.50007927 C-13.54811001 639.25168228 -13.54811001 639.25168228 -15.54811001 637.25168228 C-15.80689907 634.11886978 -15.80689907 634.11886978 -15.81373501 630.12668228 C-15.81564846 629.42398209 -15.81756191 628.72128189 -15.81953335 627.99728775 C-15.82089476 626.51111874 -15.81720133 625.02493783 -15.8088522 623.53879166 C-15.79815154 621.26052583 -15.8087484 618.98304851 -15.82154751 616.70480728 C-15.82022591 615.2620972 -15.81766349 613.81938762 -15.81373501 612.37668228 C-15.81147915 611.05926041 -15.80922329 609.74183853 -15.80689907 608.38449478 C-15.54811001 605.25168228 -15.54811001 605.25168228 -13.54811001 603.25168228 C-11.06343239 602.86602224 -8.66224334 602.59450954 -6.16139126 602.40011978 C-5.05854038 602.30448242 -5.05854038 602.30448242 -3.93340969 602.20691299 C-2.37442459 602.07340216 -0.81506217 601.94423722 0.7446146 601.81906509 C3.11341115 601.62876928 5.48084646 601.42585341 7.84837437 601.22043228 C9.36588933 601.09207921 10.88346593 600.96445231 12.40110874 600.83761978 C13.10241413 600.77827255 13.80371952 600.71892532 14.52627659 600.65777969 C18.85461235 600.31338137 23.11495801 600.19868515 27.45188999 600.25168228 C27.45188999 599.59168228 27.45188999 598.93168228 27.45188999 598.25168228 C29.72138101 597.5801288 31.99228609 596.91428598 34.26438999 596.25168228 C35.5289603 595.88043228 36.79353062 595.50918228 38.09642124 595.12668228 C41.45188999 594.25168228 41.45188999 594.25168228 44.45188999 594.25168228 C44.69938999 593.63293228 44.94688999 593.01418228 45.20188999 592.37668228 C46.70464715 589.82199511 47.84907493 589.55308981 50.45188999 588.25168228 C51.7948348 586.59275046 53.12933687 584.92691623 54.45188999 583.25168228 C55.11188999 583.25168228 55.77188999 583.25168228 56.45188999 583.25168228 C56.69938999 582.42668228 56.94688999 581.60168228 57.20188999 580.75168228 C58.45188999 577.25168228 58.45188999 577.25168228 60.32688999 573.87668228 C63.65167446 567.50209551 64.86381322 560.212189 66.45188999 553.25168228 C67.11188999 553.25168228 67.77188999 553.25168228 68.45188999 553.25168228 C68.43255405 551.95359634 68.41321812 550.65551041 68.39329624 549.31808853 C68.39405653 545.41399242 68.65602379 541.62211677 69.10313404 537.74654967 C70.18755173 528.05852611 70.72255552 518.39502988 71.01020908 508.65257645 C71.03102452 507.96611908 71.05183995 507.27966171 71.07328616 506.5724026 C71.54406473 490.79773166 71.59592289 475.02789459 71.58261466 459.24739635 C71.58029911 455.16075482 71.58386991 451.07411706 71.58659458 446.98747635 C71.59098696 439.0311544 71.5901054 431.074842 71.58718194 423.11851972 C71.58490198 416.63928649 71.58462646 410.16005589 71.58570576 403.68082237 C71.58593561 402.28531727 71.58593561 402.28531727 71.5861701 400.86162015 C71.5864899 398.97030691 71.58681411 397.07899367 71.58714269 395.18768043 C71.5899783 377.55014062 71.58674071 359.91260605 71.58134232 342.2750671 C71.5768753 327.21543035 71.57765313 312.15580131 71.58226109 297.0961647 C71.58763971 279.5101684 71.58970456 261.92417666 71.58664882 244.33817965 C71.58633035 242.45502857 71.58601598 240.5718775 71.58570576 238.68872643 C71.58555148 237.76273062 71.58539721 236.83673481 71.58523826 235.88267852 C71.58438298 229.42773102 71.58581438 222.97278647 71.58818531 216.51783943 C71.59102027 208.62791383 71.59016849 200.73799815 71.58490457 192.84807365 C71.58231668 188.84005291 71.58117647 184.83204856 71.58455372 180.82402802 C71.59644191 165.35817535 71.49796221 149.90773343 71.00630283 134.44871902 C70.96756711 133.21368604 70.92883139 131.97865305 70.88892186 130.70619482 C70.48503392 119.1864684 69.59283764 107.72001721 68.45188999 96.25168228 C68.38099155 95.43280533 68.31009312 94.61392838 68.23704624 93.77023697 C67.84013004 89.5451684 67.19264252 86.16028648 65.45188999 82.25168228 C64.83087719 80.00627353 64.22796788 77.75581037 63.63938999 75.50168228 C61.40545651 67.57910779 58.67422447 60.83032699 52.45188999 55.25168228 C51.79188999 54.26168228 51.13188999 53.27168228 50.45188999 52.25168228 C49.58563999 51.73605728 48.71938999 51.22043228 47.82688999 50.68918228 C47.04313999 50.21480728 46.25938999 49.74043228 45.45188999 49.25168228 C45.45188999 48.59168228 45.45188999 47.93168228 45.45188999 47.25168228 C44.87181187 47.14211197 44.29173374 47.03254166 43.69407749 46.91965103 C42.52231968 46.681819 42.52231968 46.681819 41.32688999 46.43918228 C40.56118687 46.28836197 39.79548374 46.13754166 39.00657749 45.98215103 C36.45188999 45.25168228 36.45188999 45.25168228 33.90892124 43.81027603 C28.86049919 41.53420778 23.71628509 40.9307966 18.26438999 40.12668228 C17.19124546 39.95781509 16.11810093 39.78894791 15.01243687 39.61496353 C8.84677668 38.66754811 2.73373437 37.96702765 -3.49464321 37.59982681 C-4.17228725 37.48493912 -4.8499313 37.37005142 -5.54811001 37.25168228 C-7.04355543 34.26079144 -6.71090299 31.18801042 -6.71607876 27.90793228 C-6.71940716 27.18303604 -6.72273556 26.4581398 -6.72616482 25.71127701 C-6.73122926 24.17803965 -6.73357329 22.64479127 -6.73341274 21.11154556 C-6.73560139 18.76093885 -6.75376752 16.4107998 -6.77271938 14.06027603 C-6.77565293 12.57199639 -6.77763799 11.08371452 -6.77857876 9.59543228 C-6.78576427 8.89019424 -6.79294979 8.18495621 -6.80035305 7.45834732 C-6.77332012 1.71126229 -5.78744197 0.00224776 0 0 Z "
        fill="#000000"
        transform="translate(701.5481100082397,192.74831771850586)"
      />
      <path
        d="M0 0 C11.55 0 23.1 0 35 0 C35 325.05 35 650.1 35 985 C23.12 985 11.24 985 -1 985 C-1.01667175 893.29651206 -1.03256992 801.59302397 -1.04234314 703.60777283 C-1.04248259 702.2067186 -1.04262204 700.80566437 -1.04276149 699.40461015 C-1.04568397 669.99826654 -1.04840071 640.59192291 -1.05087968 611.18557926 C-1.0521251 596.4145303 -1.05341008 581.64348134 -1.05473244 566.87243239 C-1.05493169 564.64422909 -1.05512981 562.4160258 -1.05532788 560.18782251 C-1.05838907 525.86310944 -1.06230014 491.53839672 -1.06866455 457.21368408 C-1.06880145 456.47526992 -1.06893835 455.73685576 -1.0690794 454.97606541 C-1.07129186 443.07009976 -1.07357543 431.16413413 -1.07586844 419.25816849 C-1.08246925 384.97920541 -1.08854713 350.70024261 -1.09113979 316.42127895 C-1.09119333 315.71685378 -1.09124686 315.0124286 -1.09130202 314.2866572 C-1.09246759 298.82547858 -1.09336253 283.36429996 -1.09400098 267.9031213 C-1.09426262 261.68273819 -1.09456324 255.46235508 -1.09487724 249.24197197 C-1.09491067 248.56116406 -1.0949441 247.88035615 -1.09497854 247.1789177 C-1.09607625 225.21722035 -1.10035163 203.25552501 -1.10628221 181.29382848 C-1.11240371 158.57002769 -1.11501714 135.84622857 -1.11350138 113.12242682 C-1.1127377 100.00743754 -1.11479608 86.89245558 -1.12079754 73.77746762 C-1.12452711 65.03410832 -1.1246781 56.29075384 -1.12183181 47.54739421 C-1.12031145 42.55440132 -1.12042969 37.56142235 -1.12488318 32.56843091 C-1.12889485 28.03671521 -1.12840424 23.50502443 -1.12413998 18.97330917 C-1.12341884 17.33396598 -1.12441641 15.69462103 -1.12723524 14.0552801 C-1.13079343 11.84803383 -1.12831925 9.6408785 -1.1241985 7.43363529 C-1.12435448 6.2059118 -1.12451046 4.97818831 -1.12467116 3.71326107 C-1 1 -1 1 0 0 Z "
        fill="#000000"
        transform="translate(522,40)"
      />
    </svg>
  ),
};

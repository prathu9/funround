"use client";
import { archivo } from "@/fonts/fonts";
import GradientButton from "../form-elements/GradientButton";
import { useEffect, useRef, useState, useContext, SetStateAction, Dispatch } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/user-context";

interface TermProps {
  setShowTerms?: Dispatch<SetStateAction<boolean>>
}

const Terms = ({setShowTerms}:TermProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const termsContainerRef = useRef<HTMLDivElement>(null);
  const [disableBtn, setDisableBtn] = useState(true);
  const {userDetail, setUserDetail} = useContext(UserContext);


  useEffect(() => {
    let termsContainer = termsContainerRef.current;
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (Math.ceil(target.scrollTop) + target.clientHeight >= target.scrollHeight) {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    };

    if (termsContainer) {
      termsContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (termsContainer) {
        termsContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [termsContainerRef]);

  const handleBtnClick = () => {
    const userData = JSON.parse(localStorage.getItem("user-detail") || '{}');
    
    if(userData && Object.keys(userData).length > 0){
      const userDataParsed = userData;
      localStorage.setItem("user-detail", JSON.stringify({...userDataParsed, termsOfUse: true}));
      router.push("/");
    }
    else if(pathname === "/signup"){
      setUserDetail({
        ...userDetail,
        termsOfUse: true
      });
      if(setShowTerms){
        setShowTerms(false);
      }
    }
    else{
      setUserDetail({
        ...userDetail,
        termsOfUse: true
      });
      router.back();
    }
  }

  return (
    <div
      className="w-full max-w-[696px] px-3 py-[47px] absolute top-[1.2vw] left-1/2 -translate-x-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
    >
      <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
        TERMS <br /> & CONDITIONS
      </h1>
      <div className="p-4 h-[438px] bg-[#35353E] rounded-2xl">
        <div
          ref={termsContainerRef}
          className="h-full text-sm overflow-y-scroll"
        >
          <h3 className="mb-2">1. FunRound.io</h3>
          <p className="mb-2">
            1.1 FunRound.io is owned and operated by Medium Rare, N.V.
            (hereinafter "FunRound", "We" or "Us"), a company with head office
            at Korporaalweg 10, Willemstad, Curaçao. FunRound is licensed and
            regulated by the Government of Curaçao under the gaming license
            8048/JAZ issued to Antillephone. Some credit card payment processing
            are handled by its wholly owned subsidiary, Medium Rare Limited.
          </p>
          <h3 className="mb-2">2. IMPORTANT NOTICE</h3>
          <p className="mb-2">
            2.1 By registering on www.funround.io (the “Website”), you enter
            into a contract with Medium Rare N.V., and agree to be bound by (i)
            these Terms and Conditions; (ii) our Privacy Policy; (iii) our
            Cookies Policy and (iv) the rules applicable to our betting or
            gaming products as further referenced in these Terms and Conditions
            (“Terms and Conditions” or “Agreement”), and the betting and/or
            gaming specific rules, and are deemed to have accepted and
            understood all the terms.
          </p>
          <p className="mb-2">
            2.2 Please read this Agreement carefully to make sure you fully
            understand its content. If you have any doubts as to your rights and
            obligations resulting from the acceptance of this Agreement, please
            consult a legal advisor in your jurisdiction before further using
            the Website(s) and accessing its content. If you do not accept the
            terms, do not use, visit or access any part (including, but not
            limited to, sub-domains, source code and/or website APIs, whether
            visible or not) of the Website.
          </p>
          <h3 className="mb-2">3. GENERAL</h3>
          <p className="mb-2">
            3.1 When registering on{" "}
            <span className="underline">www.funround.io</span> You (“You”,
            “Your”, Yourself” or the “Player” interchangeably) enter into an
            agreement with FunRound.
          </p>
          <p className="mb-2">
            3.2 This Agreement should be read by You in its entirety prior to
            your use of FunRound's service or products. Please note that the
            Agreement constitutes a legally binding agreement between you and
            FunRound.
          </p>
          <p className="mb-2">
            3.3 These Terms and Conditions come into force as soon as you
            complete the registration process, which includes checking the box
            accepting these Terms and Conditions and successfully creating an
            account. By using any part of the Website following account
            creation, you agree to these Terms and Conditions applying to the
            use of the Website.
          </p>
          <p className="mb-2">
            3.4 We are entitled to make amendments to these Terms and Conditions
            at any time and without advanced notice. If we make such amendments,
            we may take appropriate steps to bring such changes to your
            attention (such as by email or placing a notice on a prominent
            position on the Website, together with the amended terms and
            conditions) but it shall be your sole responsibility to check for
            any amendments, updates and/or modifications. Your continued use of
            the website services after any such amendment to the Terms and
            Conditions will be deemed as your acceptance and agreement to be
            bound by such amendments, updates and/or modifications.
          </p>
          <p className="mb-2">
            3.5 The terms of this Terms and Conditions shall prevail in the
            event of any conflict between the terms of this Terms and Conditions
            and of any of the game rules or other documents referred to in this
            Terms and Conditions.
          </p>
          <p className="mb-2">
            3.6 These Terms and Conditions may be published in several languages
            for informational purposes and ease of access by players. The
            English version is the only legal basis of the relationship between
            you and us and in the case of any discrepancy with respect to a
            translation of any kind, the English version of these Terms and
            Conditions shall prevail.
          </p>
          <h3 className="mb-2">4. FunRound ACCOUNT Registration</h3>
          <p className="mb-2">
            4.1 In order for you to be able to place bets on funround.io, you
            must first personally register an account with us ("FunRound
            Account").
          </p>
          <p className="mb-2">
            4.2 For a person to be registered as a player with FunRound and use
            the Website, that person must submit an application for registration
            and opening of a FunRound account. The application for the opening
            of the FunRound Account must be submitted personally, and will
            require You to provide a set of personal information, namely e-mail,
            full name, date of birth, address, etc.
          </p>
          <p className="mb-2">
            4.3 Where the information stipulated in 4.2. is not provided and/or
            is not deemed to be complete, accurate or up-to-date at any point in
            time, FunRound reserves the right to suspend the FunRound Account
            registration and treat any subsequent potentially accepted deposits
            to the Player’s FunRound Account as invalid (and any winnings
            arising from such deposit as void). Where a FunRound Account is
            suspended, You should contact customer support at
            support@funround.io.
          </p>
          <p className="mb-2">
            4.4 All applicants must be 18 or such other legal age of majority as
            determined by any laws which are applicable to you, whichever age is
            greater or older. FunRound reserves the right to ask for proof of
            age from any Player and suspend their FunRound Account until
            satisfactory documentation is provided. FunRound takes its
            responsibilities in respect of under age and responsible gambling
            very seriously.
          </p>
          <p className="mb-2">4.5 FunRound will not accept registration from individuals:</p>
          <ul className="mb-2">
            <li>
              a) Under 18 years old or under the legal age of majority or
              gambling in their jurisdiction;
            </li>
            <li>
              b) Residing in jurisdictions from where it is illegal or gambling
              is not permitted. FunRound is not able to verify the legality of
              the Service in each jurisdiction and it is the User's
              responsibility to ensure that their use of the Service is lawful;
            </li>
            <li>
              c) Provide misleading information or try to pass by third parties.
            </li>
          </ul>
          <p className="mb-2">
            4.6 FunRound reserves the right to refuse any application for a
            FunRound Account, at its sole discretion.
          </p>
          <h4>Know Your Customer</h4>
          <p className="mb-2">
            4.7 You represent and warrant that any information provided by You
            on Your application form is true, updated and correct.
          </p>
          <p className="mb-2">
            4.8 FunRound reserves the right, at any time, to ask for any KYC
            documentation it deems necessary to determine the identity and
            location of a Player. FunRound reserves the right to restrict the
            Service, payment or withdrawal until identity is sufficiently
            determined, or for any other reason in FunRound’s sole discretion.
            FunRound also reserves the right to disclose a Player’s information
            as appropriate to comply with legal process or as otherwise
            permitted by the privacy policy of FunRound (owner and operator of
            FunRound), and by using the Service, you acknowledge and consent to
            the possibility of such disclosure.
          </p>
          <h4 className="mb-2">Multiple Accounts</h4>
          <p className="mb-2">
            4.9 Only one FunRound Account per Player is allowed. Should You
            attempt or successfully open more than one FunRound Account, under
            Your own name or under any other name, or should You attempt or
            succeed in using the Website by means of any other person's FunRound
            Account, FunRound will be entitled to immediately close all Your
            FunRound Account(s), retain all monies in such FunRound Accounts and
            ban You from future use of the Website.
          </p>
          <p className="mb-2">
            4.10 Should FunRound have reason to believe that You have registered
            and/or used more than one FunRound Account, or colluded with one or
            more other individuals using a number of different FunRound
            Accounts, FunRound shall be entitled to deem such accounts as
            constituting multiple FunRound Accounts, and suspend or close all
            such FunRound Accounts. FunRound will also be entitled to retain the
            funds till the Player proves that he did not attempt to create
            multiple accounts.
          </p>
          <p className="mb-2">
            4.11 If you notice that you have more than one registered FunRound
            Account you must notify us immediately. Failure to do so may lead to
            your FunRound Account being blocked and the funds retained.
          </p>
          <h4 className="mb-2">User Responsibility</h4>
          <p className="mb-2">
            4.12 It is your sole and exclusive responsibility to ensure that
            your login details are kept securely. You must not disclose your
            login details to anyone.
          </p>
          <p className="mb-2">
            4.13 We are not liable or responsible for any abuse or misuse of
            your FunRound Account by third parties due to your disclosure,
            whether intentional, accidental, active or passive, of your login
            details to any third party.
          </p>
          <p className="mb-2">
            4.14 You are prohibited from selling, transferring or acquiring
            FunRound Accounts to or from other Players.
          </p>
          <p className="mb-2">
            4.15 You will inform us as soon as you become aware of any errors
            with respect to your account or any calculations with respect to any
            bet you have placed. We reserve the right to declare null and void
            any bets that are subject to such an error.
          </p>
          <p className="mb-2">
            4.16 You are responsible for all activities that occur under your
            account. Security Features
          </p>
          <p className="mb-2">
            4.17 We recommend that you enable two-factor authentication to
            enhance the security of your account.
          </p>
          <p className="mb-2">
            4.18 We may provide other security measures from time to time, and
            we encourage you to use them.
          </p>
          <h4 className="mb-2">Suspension and Closure by FunRound</h4>
          <p className="mb-2">
            4.19 FunRound shall be entitled to close or suspend Your FunRound
            Account if:
          </p>
          <ul className="mb-2">
            <li>
              a) FunRound considers that You are using or have used the Website
              in a fraudulent or collusive manner or for illegal and/or unlawful
              or improper purposes;
            </li>
            <li>
              b) FunRound considers that You are using or have used the Website
              in an unfair manner, have deliberately cheated or taken unfair
              advantage of FunRound or any of its customers or if Your FunRound
              Account is being used for the benefit of a third party;
            </li>
            <li>
              c) FunRound is requested to do so by the police, any regulatory
              authority or court or if FunRound is unable to verify Your
              identity, profession or source of funds as is expressly required
              by the applicable regulations;
            </li>
            <li>
              d) You are in breach of these Terms and Conditions, the applicable
              regulations or the fair use of our services, or FunRound has
              concerns that You are a compulsive problem gambler without being
              self-excluded;
            </li>
            <li>
              e) FunRound considers that any of the events referred to in (a) to
              (e) above may have occurred or are likely to occur.
            </li>
          </ul>
          <p className="mb-2">
            4.20 If FunRound closes or suspends Your FunRound Account for any of
            the reasons referred to in 4.19, You shall, to the extent permitted
            by applicable laws, be liable for any and all claims, direct losses,
            liabilities, damages, costs and expenses incurred or suffered by
            FunRound (together, the “Claims”) arising therefrom and shall, to
            the extent permitted by applicable laws, indemnify and hold FunRound
            harmless on demand for such Claims.
          </p>
          <p className="mb-2">
            4.21 In the circumstances referred to in 4.19, FunRound shall also
            be entitled to void any bets placed by You following such actions by
            You or to withhold and/or retain any and all amounts which would
            otherwise have been paid or payable to you (including any winnings)
            to the extent permitted by law.
          </p>
          <p className="mb-2">
            4.22 We reserve the right to suspend or terminate your account at
            any time, with or without notice, if we suspect that you account has
            been compromised or is being used in breach of our Terms of Service.
          </p>
          <p className="mb-2">
            4.23 If FunRound closes Your FunRound Account it will inform You of
            the available means to withdraw the remaining balance on Your
            FunRound Account. Our Liability
          </p>
          <p className="mb-2">
            4.24 We take no responsibility for any loss or damage that you may
            suffer as a result of unauthorised access to your account.
          </p>
          <p className="mb-2">
            4.25 We take no responsibility for any loss or damage that you may
            suffer as a result of your failure to keep your login secure and
            private.
          </p>
          <h3 className="mb-2">5. YOUR WARRANTIES</h3>
          <p className="mb-2">
            5.1 Prior to your use of the Service and on an ongoing basis you
            represent, warrant, covenant and agree that:
          </p>
          <h4 className="mb-2">Capacity</h4>
          <ul className="mb-2">
            <li>
              a) You are over 18 or such other legal age of majority as
              determined by any laws which are applicable to you, whichever age
              is greater;
            </li>
            <li>
              b) You have full capacity to enter into a legally binding
              agreement with us and you are not restricted by any form of
              limited legal capacity;
            </li>
            <li>
              c) You are not diagnosed or classified as a compulsive or problem
              gambler;
            </li>
            <li>
              d) You are not currently self-excluded from any gambling site or
              gambling premises. You will inform FunRound immediately if you
              enter into a self-exclusion agreement with any gambling provider.
            </li>
          </ul>
          <h3 className="mb-2">Jurisdiction</h3>
          <ul className="mb-2">
            <li>
              e) You are accessing funround.io from a jurisdiction in which it
              is legal to do so;
            </li>
            <li>
              f) You will not use our services while located in any jurisdiction
              that prohibits the placing and/or accepting of bets online and/or
              playing casino and/or live games;
            </li>
            <li>
              g) You accept and acknowledge that we reserve the right to detect
              and prevent the use of prohibited techniques, including but not
              limited to fraudulent transaction detection, automated
              registration and signup, gameplay and screen capture techniques.
              These steps may include, but are not limited to, examination of
              Players device properties, detection of geo-location and IP
              masking, transactions and blockchain analysis;
            </li>
          </ul>
          <h3 className="mb-2">Funds & Tax</h3>
          <ul className="mb-2">
            <li>
              h) You are solely responsible for reporting and accounting for any
              taxes applicable to you under relevant laws for any winnings that
              you receive from us;
            </li>
            <li>
              i) You are solely responsible for any applicable taxes which may
              be payable on cryptocurrency and FIAT awarded to you through your
              using the Service;
            </li>
            <li>
              j) There is a risk of losing cryptocurrency and FIAT when using
              the Service and that FunRound has no responsibility to you for any
              such loss;
            </li>
            <li>
              k) You will not deposit funds which originate from criminal or
              other unauthorised activity;
            </li>
            <li>
              l) You will not deposit funds using payment methods that do not
              belong to You;
            </li>
            <li>
              m) All the funds deposited shall exclusively be used for Services
              available on the Website;
            </li>
            <li>
              n) You will not withdraw or try to withdraw to a payment methods
              that do not belong to You;
            </li>
            <li>
              o) You understand that by participating in the Services available
              on the Website, You take the risk of losing money deposited.
            </li>
            <li>
              p) You accept and acknowledge that the value of cryptocurrency can
              change dramatically depending on the market value;
            </li>
            <li>
              q) FunRound shall not be treated as a financial institution;
            </li>
          </ul>
          <h3 className="mb-2">Others</h3>
          <ul className="mb-2">
            <li>
              r) Your use of the Service is at your sole option, discretion and
              risk;
            </li>
            <li>
              s) You will not conduct criminal activities through the FunRound
              Account;
            </li>
            <li>
              t) All information that you provide to us during the term of
              validity of this agreement is true, complete, correct, and that
              you shall immediately notify us of any change of such information;
            </li>
            <li>
              u) You participate in the Games strictly in your personal and
              non-professional capacity and participate for recreational and
              entertainment purposes only;
            </li>
            <li>
              v) You participate in the Games on your own behalf and not on the
              behalf of any other person;
            </li>
            <li>
              w) You have only one account with us and agree to not to open any
              more accounts with us;
            </li>
            <li>
              x) The telecommunications networks and Internet access services
              required for you to access and use the Service are entirely beyond
              the control of FunRound and FunRound shall have no liability
              whatsoever for any outages, slowness, capacity constraints or
              other deficiencies affecting the same;
            </li>
            <li>
              y) You will not be involved in any fraudulent, collusive, fixing
              or other unlawful activity in relation to Your or any third
              parties’ participation in any of the games and/or services on the
              Website, and shall not use any software-assisted methods or
              techniques or hardware devices for Your participation in any of
              the games and/or services on the Website;
            </li>
            <li>
              z) If you have access to non-public information related to an
              event or that can impact the outcome of an event or bet type, You
              will not bet on any event overseen by the relevant sport/event
              governing body;
            </li>
            <li>
              aa) If You are an athlete, coach, manager, owner, referee, or
              anyone with sufficient authority to influence the outcome of an
              event You will not bet on any event overseen by the relevant sport
              or event of the governing body;
            </li>
            <li>
              bb) If You are an owner (a person who is a direct or indirect
              legal or beneficial owner of 10 percent or greater) of a sport
              governing body or member team You will not bet on any event
              overseen by the sport governing body or any event in which a
              member team of that sport or event governing body participates;
            </li>
            <li>
              cc) If You are involved in a sport or event You will not be
              involved in compiling betting odds for the competition in which
              You are involved.
            </li>
          </ul>
          <p className="mb-2">
            5.2 In case of a breach of any of the representations, warrants or
            covenants mentioned in 5.1, FunRound reserves the right to close or
            suspend Your FunRound account at its own discretion and void any
            bets to the extent applicable by law.
          </p>
        </div>
      </div>
      <GradientButton
        handleClick={handleBtnClick}
        className={`mt-12 w-full px-4 py-[26px] text-sm rounded-2xl whitespace-normal text-wrap sm:text-lg ${
          disableBtn && "opacity-45"
        }`}
      >
        I have read and accepted the terms and conditions
      </GradientButton>
    </div>
  );
};

export default Terms;

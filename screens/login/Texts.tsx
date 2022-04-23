import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/Themed";

export default function Texts(props: any) {
    if (props.type === "privacy") {
        var modalHeight = 80;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Digital: Minimalist To-do App | Privacy Policy
                </Text>
                <Text style={styles.paragraf}>
                    This Privacy Policy describes the policies and procedures of
                    Digital: Minimalist To-do App ("we" or "us") on the
                    collection, use and disclosure of your information on the
                    Digital: Minimalist To-do App mobile application and the
                    related services, features, content or applications in
                    connection therewith (collectively, "Digital: Minimalist
                    To-do App"). In connection with your use of Digital:
                    Minimalist To-do App, we receive information about you from
                    various sources, including: (i) through your Digital:
                    Minimalist To-do App user account (your "Account"); (ii)
                    your use of Digital: Minimalist To-do App generally; and
                    (iii) from third party websites and services. When you use
                    Digital: Minimalist To-do App, you are consenting to the
                    collection, transfer, manipulation, storage, transmission,
                    disclosure and other uses of your information as described
                    in this Privacy Policy.
                </Text>

                <Text style={styles.subTitle}>
                    What Does This Privacy Policy Cover?
                </Text>
                <Text style={styles.paragraf}>
                    This Privacy Policy covers the treatment of personally
                    identifiable information ("Personal Information") we gather
                    when you are using or accessing Digital: Minimalist To-do
                    App. This Privacy Policy also covers our treatment of any
                    Personal Information that our business partners share with
                    us or that we share with our business partners. This Privacy
                    Policy does not apply to the practices of third parties that
                    we do not own or control, including but not limited to any
                    third party websites, content sources, services and
                    applications ("Third Party Services") that you elect to
                    access through Digital: Minimalist To-do App, or to
                    individuals that we do not manage or employ. While we
                    attempt to facilitate access only to those Third Party
                    Services that share our respect for your privacy, we cannot
                    take responsibility for the content or privacy policies of
                    those Third Party Services. We encourage you to carefully
                    review the privacy policies of any Third Party Services you
                    access.
                </Text>
                <Text style={styles.subTitle}>
                    What Information Is Collected by Digital: Minimalist To-do
                    App?
                </Text>
                <Text style={styles.paragraf}>
                    The information we gather enables us to personalize, improve
                    and continue to operate Digital: Minimalist To-do App. In
                    connection with certain aspects of Digital: Minimalist To-do
                    App, we may request, collect and/or display some of your
                    Personal Information. We collect the following types of
                    information from our users.
                </Text>
                <Text style={styles.subTitle}>User Content:</Text>
                <Text style={styles.paragraf}>
                    Digital: Minimalist To-do App allows you to provide content
                    to Digital: Minimalist To-do App. All content submitted by
                    you to Digital: Minimalist To-do App will be retained by us
                    indefinitely, unless you delete your account.
                </Text>
                <Text style={styles.subTitle}>Aggregate Information:</Text>
                <Text style={styles.paragraf}>
                    We collect statistical information about how people use
                    Digital: Minimalist To-do App ("Aggregate Information").
                    Some of this information is derived from Personal
                    Information, such as your location (which, in turn, can be
                    derived from your IP address or through location based
                    services used by your device). This statistical information
                    is not Personal Information and cannot be tied back to you,
                    your Account or your Digital: Minimalist To-do App.
                </Text>
                <Text style={styles.subTitle}>
                    How and To Whom Is My Information Shared?
                </Text>
                <Text style={styles.subTitle}>
                    Information You Elect to Share:
                </Text>
                <Text style={styles.paragraf}>
                    You may access Third Party Services through Digital:
                    Minimalist To-do App, for example by clicking on links to
                    those Third Party Services from Digital: Minimalist To-do
                    App. We are not responsible for the privacy policies and/or
                    practices of these Third Party Services, and you are
                    responsible for reading and understanding those privacy
                    policies. This Privacy Policy only governs information
                    collected on or through Digital: Minimalist To-do App.
                </Text>
                <Text style={styles.subTitle}>Aggregate Information:</Text>
                <Text style={styles.paragraf}>
                    We share Aggregate Information with our partners, service
                    providers and other persons with whom we conduct business.
                    We share this type of statistical data so that our partners
                    can understand how and how often people use Digital:
                    Minimalist To-do App and their services or websites, which
                    facilitates improving both their services and how we
                    interface with them. In addition, these third parties may
                    share with us non-private, aggregated or otherwise
                    non-Personal Information about you that they have
                    independently developed oracquired.
                </Text>
                <Text style={styles.subTitle}>Email Communications:</Text>
                <Text style={styles.paragraf}>
                    As part of Digital: Minimalist To-do App, you may
                    occasionally receive from us email and other communication
                    relating to your Account. These emails will only be sent for
                    purposes important to Digital: Minimalist To-do App, such as
                    Account information.
                </Text>
                <Text style={styles.subTitle}>
                    Information Disclosed Pursuant to Business Transfers:
                </Text>
                <Text style={styles.paragraf}>
                    If we, or substantially all of our assets associated with
                    Digital: Minimalist To-do App, were acquired, or in the
                    unlikely event that we go out of business or enter
                    bankruptcy, user information would be one of the assets that
                    is transferred or acquired by a third party. You acknowledge
                    that such transfers may occur, and that any acquirer of us
                    may continue to use your
                </Text>
                <Text style={styles.subTitle}>
                    Information Disclosed for the Protection of Us and Others:
                </Text>
                <Text style={styles.paragraf}>
                    We also reserve the right to access, read, preserve, and
                    disclose any information as it reasonably believes is
                    necessary to (i) satisfy any applicable law, regulation,
                    legal process or governmental request, (ii) enforce these
                    Terms of Service, including investigation of potential
                    violations hereof, (iii) detect, prevent, or otherwise
                    address fraud, security or technical issues, (iv) respond to
                    user support requests, or (v) protect our rights, property
                    or safety, our users and the public. This includes
                    exchanging information with other companies and
                    organizations for fraud protection and spam prevention.
                </Text>
                <Text style={styles.subTitle}>
                    Information We Share With Your Consent:
                </Text>
                <Text style={styles.paragraf}>
                    Except as set forth above, you will be notified when your
                    Personal Information may be shared with third parties, and
                    will be able to prevent the sharing of this information.
                </Text>
                <Text style={styles.subTitle}>
                    Is Information About Me Secure?
                </Text>
                <Text style={styles.paragraf}>
                    Your Account information is protected for your privacy and
                    security. We endeavor to protect Account information to
                    ensure that it is kept private; however, we cannot guarantee
                    the security of any Account information. Unauthorized entry
                    or use, hardware or software failure, and other factors, may
                    compromise the security of user information at any time. We
                    otherwise store all of our information, including your IP
                    address information, using industry-standard security
                    techniques. We do not guarantee or warrant that such
                    techniques will prevent unauthorized access to information
                    about you we store, Personal Information or otherwise.
                </Text>
                <Text style={styles.subTitle}>
                    What Happens When There Are Changes to this Privacy Policy?
                </Text>
                <Text style={styles.paragraf}>
                    We may amend this Privacy Policy from time to time. Use of
                    information we collect now is subject to the Privacy Policy
                    in effect at the time such information is used. If we make
                    changes in the way we collect or use information, we will
                    notify you by posting an announcement on or within Digital:
                    Minimalist To-do App or by sending you an email. A user is
                    bound by any changes to the Privacy Policy when he or she
                    uses Digital: Minimalist To-do App after such changes have
                    been first posted.
                </Text>
                <Text style={styles.subTitle}>
                    What If I Have Questions or Concerns?
                </Text>
                <Text style={styles.paragraf}>
                    If you have any questions or concerns regarding privacy
                    using Digital: Minimalist To-do App, please send us a
                    detailed message to: hello@digitaltodoapp.com. We will make
                    every effort to resolve your concerns.
                </Text>
            </View>
        );
    }
    if (props.type === "terms") {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Digital: Minimalist To-do App | Terms of Use
                </Text>
                <Text>
                    Please read these Terms of Use (collectively with the
                    Digital: Minimalist To-do App Privacy Policy carefully
                    before using the Digital: Minimalist To-do App mobile
                    application and the services, features, content and
                    applications offered in connection with Digital: Minimalist
                    To-do App (collectively, “Digital: Minimalist To-do App”) by
                    Digital: Minimalist To-do App (“we” or “us”). These Terms of
                    Use set forth the legally binding terms and conditions for
                    your use of Digital: Minimalist To-do App.
                </Text>
                <Text style={styles.subTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraf}>
                    a. By registering for and/or using Digital: Minimalist To-do
                    App in any manner, including but not limited to downloading
                    and using the Digital: Minimalist To-do App, you agree to
                    these Terms of Use and all other operating rules, policies
                    and procedures that may be published from time to time on or
                    within Digital: Minimalist To-do App, each of which is
                    incorporated by reference.
                </Text>
                <Text>
                    b. These Terms of Use apply to all users of Digital:
                    Minimalist To-do App, including, without limitation, users
                    who are contributors of content, information, and other
                    materials or services, registered or otherwise.
                </Text>

                <Text style={styles.subTitle}>2. Modification</Text>
                <Text style={styles.paragraf}>
                    We reserve the right, at our sole discretion, to modify or
                    replace any of these Terms of Use, or change, suspend, or
                    discontinue Digital: Minimalist To-do App (including without
                    limitation, the availability of any feature, database, or
                    content) at any time by posting a notice on or within
                    Digital: Minimalist To-do App or by notifying you by e-mail.
                    We may also impose limits on certain features of Digital:
                    Minimalist To-do App or restrict your access to parts or all
                    of Digital: Minimalist To-do App without notice or
                    liability. It is your responsibility to check these Terms of
                    Use periodically for changes. Your use of Digital:
                    Minimalist To-do App following the posting of any changes to
                    these Terms of Use constitutes acceptance of those changes.
                </Text>

                <Text style={styles.subTitle}>3. Eligibility</Text>
                <Text style={styles.paragraf}>
                    You represent and warrant that you are at least 13 years of
                    age. If you are under age 13, you may not, under any
                    circumstances, use Digital: Minimalist To-do App. We may, at
                    our sole discretion, refuse to offer Digital: Minimalist
                    To-do App to any person or entity and change our eligibility
                    criteria at any time. You are solely responsible for
                    ensuring that these Terms of Use are in compliance with all
                    laws, rules and regulations applicable to you and the right
                    to access Digital: Minimalist To-do App is revoked where
                    these Terms of Use or use of Digital: Minimalist To-do App
                    is prohibited or to the extent offering, sale or provision
                    of Digital: Minimalist To-do App conflicts with any
                    applicable law, rule or regulation. Further, Digital:
                    Minimalist To-do App is offered only for your use, and not
                    for the use or benefit of any third party.
                </Text>

                <Text style={styles.subTitle}>4. Login/Registration</Text>
                <Text style={styles.paragraf}>
                    While some features of Digital: Minimalist To-do App are
                    available to unregistered users, for broader access to
                    Digital: Minimalist To-do App you must register with
                    Digital: Minimalist To-do App by creating an “Account”. To
                    create an Account, you must provide accurate information
                    included on the registration page. You are responsible for
                    updating the accuracy of the information that you provide to
                    us to be associated with your Account.{" "}
                </Text>

                <Text style={styles.subTitle}>5. Account Security</Text>
                <Text style={styles.paragraf}>
                    You are solely responsible for the activity that occurs on
                    your Account. You are not permitted to use another Account
                    without permission. You must notify us immediately of any
                    breach of security or other unauthorized use of your
                    Account. You should never publish, distribute or post login
                    information for your Account.
                </Text>

                <Text style={styles.subTitle}>6. Access Rights</Text>
                <Text style={styles.paragraf}>
                    Without limiting any other terms of these Terms of Use, by
                    using Digital: Minimalist To-do App you understand and agree
                    that we, as an agent on your behalf, may access content from
                    third party websites and services so that it is available to
                    you through use of Digital: Minimalist To-do App, and you
                    give Digital: Minimalist To-do App permission to do so. You
                    agree that any content that you submit to a Third Party
                    Service may be stored by us at your direction, although we
                    do not undertake any obligations to maintain such
                    submissions.
                </Text>

                <Text style={styles.subTitle}>7. Content</Text>
                <Text style={styles.paragraf}>
                    For purposes of these Terms of Use, the term “Content”
                    includes, without limitation, content, videos, audio clips,
                    written posts and comments, information, data, text, web
                    pages, images, software, scripts, graphics, and interactive
                    features generated, provided, or otherwise made accessible
                    on or through Digital: Minimalist To-do App. a. Third Party
                    Materials and Agreements. You may be able to access,
                    download, store or use Third Party Services (defined below),
                    resources, content or information (“Third Party Materials”)
                    via Digital: Minimalist To-do App. You acknowledge sole
                    responsibility for and assume all risk arising from your
                    access to or use of any such Third Party Materials and we
                    disclaim any liability that you may incur arising from your
                    access to or use of such Third Party Materials or User
                    Content (defined below) via Digital: Minimalist To-do App.
                    You acknowledge and agree that we: (i) are not responsible
                    for the availability or accuracy of such Third Party
                    Materials or the products or services on or available from
                    such Third Party Materials; (ii) have no liability to you or
                    any third party for any harm, injuries or losses suffered as
                    a result of your access to or use of such Third Party
                    Materials; and (iii) do not make any promises to remove
                    Third Party Materials from being accessed through Digital:
                    Minimalist To-do App. Your ability to access or link to
                    Third Party Materials or Third Party Services does not imply
                    any endorsement by us of Third Party Materials or any such
                    Third Party Services. b. User Content. All Content added,
                    created, uploaded, submitted, distributed, or posted to
                    Digital: Minimalist To-do App by users, whether publicly
                    posted or privately transmitted (collectively “User
                    Content”), is the sole responsibility of the user who
                    originated it. You acknowledge that all Content accessed by
                    you using Digital: Minimalist To-do App is at your own risk
                    and you will be solely responsible for any damage or loss to
                    you or any other party resulting therefrom. c. Our Content.
                    Digital: Minimalist To-do App may contain Content
                    specifically provided by us or our partners and such Content
                    is protected by copyrights, trademarks, service marks,
                    patents, trade secrets or other proprietary rights and laws.
                    You shall abide by and maintain all copyright notices,
                    information, and restrictions contained in any Content
                    accessed through Digital: Minimalist To-do App. d. Use
                    License. Subject to these Terms of Use, we grant each user
                    of Digital: Minimalist To-do App a worldwide, non-exclusive,
                    non-sublicensable and non-transferable license to use,
                    download, store, display and print the Content, solely for
                    personal, non-commercial use as part of using Digital:
                    Minimalist To-do App. Use, reproduction, modification,
                    distribution or storage of any Content for other than
                    personal, non-commercial use is expressly prohibited without
                    prior written permission from us, or from the copyright
                    holder identified in such Content's copyright notice. You
                    may not use Digital: Minimalist To-do App for any commercial
                    purposes. e. Content License Grants. i. License to Us.
                    Digital: Minimalist To-do App does not claim any ownership
                    rights in the text, images, or other materials that you post
                    on or through Digital: Minimalist To-do App. ii. License to
                    Users. You also hereby do and shall grant each user of
                    Digital: Minimalist To-do App a non-exclusive license to
                    access, use, download, store, transmit, stream, display,
                    perform and print your User Content through Digital:
                    Minimalist To-do App, and to use, edit, modify, reproduce,
                    distribute, prepare derivative works of, display and perform
                    such User Content. iii. No Infringement. You represent and
                    warrant that you have all rights to grant such licenses
                    without infringement or violation of any third party rights,
                    including without limitation, any privacy rights, publicity
                    rights, copyrights, contract rights, or any other
                    intellectual property or proprietary rights. f. Availability
                    of Content. We do not guarantee that any Content will be
                    made available on or through Digital: Minimalist To-do App.
                    Further, we have no obligation to monitor Digital:
                    Minimalist To-do App. However, we reserves the right to (i)
                    remove, edit or modify any Content in our sole discretion,
                    at any time, without notice to you and for any reason
                    (including, but not limited to, upon receipt of claims or
                    allegations from third parties or authorities relating to
                    such Content or if we are concerned that you may have
                    violated these Terms of Use), or for no reason at all and
                    (ii) remove or block any Content from Digital: Minimalist
                    To-do App.
                </Text>

                <Text style={styles.subTitle}>
                    8. Digital: Minimalist To-do App License
                </Text>
                <Text style={styles.paragraf}>
                    a. License Grant. Subject to your compliance with the terms
                    and conditions of these Terms of Use, we grant to you a
                    limited, non-exclusive, non-transferable license, without
                    the right to sublicense, to download and install the
                    Digital: Minimalist To-do App on your own mobile devices
                    that you own and control and run such copies of the Digital:
                    Minimalist To-do App solely for your personal non-commercial
                    use. You acknowledge that new versions of the Digital:
                    Minimalist To-do App may be provided at additional charge.
                    We reserve all rights in the Digital: Minimalist To-do App
                    not expressly granted to you in these Terms of Use. b.
                    Restrictions. Except as expressly specified in these Terms
                    of Use, you shall not (i) copy or modify the Digital:
                    Minimalist To-do App, including, but not limited to adding
                    new features or otherwise making adaptations that alter the
                    functioning of the Digital: Minimalist To-do App; (ii)
                    transfer, sell, rent, lease, distribute, sublicense or
                    otherwise assign any rights to, or any portion of the
                    Digital: Minimalist To-do App to any third party; or (iii)
                    make the functionality of the Digital: Minimalist To-do App
                    available to multiple users through any means, including,
                    but not limited to distribution of the Digital: Minimalist
                    To-do App or by uploading the Digital: Minimalist To-do App
                    to a network or file-sharing service or through any hosting,
                    application services provider or any other type of service.
                    The Digital: Minimalist To-do App contains trade secrets,
                    and in order to protect those secrets you agree not to
                    disassemble, decompile or reverse engineer the Digital:
                    Minimalist To-do App, in whole or in part, or permit or
                    authorize a third party to do so, except to the extent such
                    restrictions are expressly prohibited by statutory law. You
                    will comply with any technical restrictions in the Digital:
                    Minimalist To-do App that allow you to use Digital:
                    Minimalist To-do App only in certain ways. c. Updates and
                    Upgrades; No Obligation. We are not obligated to maintain or
                    support the Digital: Minimalist To-do App, or to provide you
                    with updates, upgrades or services related thereto. You
                    acknowledge that Digital: Minimalist To-do App may from time
                    to time in its sole discretion issue updates or upgrades to
                    the Digital: Minimalist To-do App, and may automatically
                    update or upgrade the version of the Digital: Minimalist
                    To-do App that you are using on your mobile device. You
                    consent to such automatic updating or upgrading on your
                    mobile device, and agree that the terms and conditions of
                    these Terms of Use will apply to all such updates or
                    upgrades. d. Export Control. You may not use, export,
                    re-export, import, or transfer the Digital: Minimalist To-do
                    App except as authorized by United States law, the laws of
                    the jurisdiction in which you obtained the Digital:
                    Minimalist To-do App, and any other applicable laws or
                    regulations. In particular, but without limitation, the
                    Digital: Minimalist To-do App may not be exported or
                    re-exported (i) into any United States embargoed countries
                    or (ii) to anyone on the U.S. Treasury Department's list of
                    Specially Designated Nationals or the U.S. Department of
                    Commerce's Denied Person's List or Entity List. By using the
                    Digital: Minimalist To-do App, you represent and warrant
                    that you are not located in any such country or on any such
                    list. You also will not use the Digital: Minimalist To-do
                    App for any purpose prohibited by U.S. law, including the
                    development, design, manufacture or production of missiles,
                    nuclear, chemical or biological weapons. e. Apple Device and
                    Android Device and Application Terms. In the event you are
                    accessing Digital: Minimalist To-do App via an application
                    on a device provided by Apple, Inc. (“Apple”) or the
                    Digital: Minimalist To-do App obtained through the Apple App
                    Store (together, the “Application”), or an application on a
                    device provided by Google, LLC (“Google”), or the Digital:
                    Minimalist To-do App obtained through the Google Play Store
                    (together, the “Application”),the following shall apply: i.
                    Both you and we acknowledge that these Terms of Use are
                    concluded between you and us only, and not with Apple or
                    Google, and that Apple or Google is not responsible for the
                    Application or the Content; ii. The Application is licensed
                    to you on a limited, non-exclusive, non-transferrable, non-
                    sublicensable basis, solely to be used in connection with
                    Digital: Minimalist To-do App for your private, personal,
                    non-commercial use, subject to all the terms and conditions
                    of these Terms of Use as they are applicable to Digital:
                    Minimalist To-do App; iii. You will only use the Application
                    in connection with an Apple device that you own or control;
                    iv. You acknowledge and agree that Apple has no obligation
                    whatsoever to furnish any maintenance and support services
                    with respect to the Application; v. In the event of any
                    failure of the Application to conform to any applicable
                    warranty, including those implied by law, you may notify
                    Apple of such failure; upon notification, Apple’s sole
                    warranty obligation to you will be to refund to you the
                    purchase price, if any, of the Application; vi. You
                    acknowledge and agree that we, and not Apple or Google, are
                    responsible for addressing any claims you or any third party
                    may have in relation to the Application; vii. You
                    acknowledge and agree that, in the event of any third party
                    claim that the Application or your possession and use of the
                    Application infringes that third party’s intellectual
                    property rights, we, and not Apple, will be responsible for
                    the investigation, defense, settlement and discharge of any
                    such infringement claim; viii.You represent and warrant that
                    you are not located in a country subject to a U.S.
                    Government embargo, or that has been designated by the U.S.
                    Government as a “terrorist supporting” country, and that you
                    are not listed on any U.S. Government list of prohibited or
                    restricted parties; ix. Both you and we acknowledge and
                    agree that, in your use of the Application, you will comply
                    with any applicable third party terms of agreement which may
                    affect or be affected by such use; and x. Both you and we
                    acknowledge and agree that Apple, Google and Apple and
                    Google’s subsidiaries are third party beneficiaries of these
                    Terms of Use, and that upon your acceptance of these Terms
                    of Use, Apple will have the right (and will be deemed to
                    have accepted the right) to enforce these Terms against you
                    as the third party beneficiary hereof.
                </Text>

                <Text style={styles.subTitle}>9. Rules of Conduct</Text>
                <Text style={styles.paragraf}>
                    You promise not to use Digital: Minimalist To-do App for any
                    purpose that is prohibited by these Terms of Use. You are
                    responsible for all of your activity in connection with
                    Digital: Minimalist To-do App. a. You shall not, and shall
                    not permit any third party to, either (i) take any action or
                    (ii) upload, download, post, submit or otherwise distribute
                    or facilitate distribution of any Content (including User
                    Content) on or through Digital: Minimalist To-do App that:
                    i. infringes any patent, trademark, trade secret, copyright,
                    right of publicity or other right of any other person or
                    entity or violates any law or contractual duty ii. is
                    unlawful, such as content that is threatening, abusive,
                    harassing, defamatory, libelous, fraudulent, invasive of
                    another's privacy, or tortuous; iii. constitutes
                    unauthorized or unsolicited advertising, junk or bulk e-mail
                    (“spamming”); iv. contains software viruses or any other
                    computer codes, files, or programs that are designed or
                    intended to disrupt, damage, limit or interfere with the
                    proper function of any software, hardware, or
                    telecommunications equipment or to damage or obtain
                    unauthorized access to any system, data, password or other
                    information of us or any third party; v. impersonates any
                    person or entity, including any of our employees or
                    representatives; vi. includes anyone's identification
                    documents or sensitive financial information; or vii. is
                    otherwise determined by us to be inappropriate at our sole
                    discretion. b. You shall not: (i) take any action that
                    imposes or may impose (as determined by us in our sole
                    discretion) an unreasonable or disproportionately large load
                    on our (or our third party providers') infrastructure; (ii)
                    interfere or attempt to interfere with the proper working of
                    Digital: Minimalist To-do App or any activities conducted on
                    Digital: Minimalist To-do App; (iii) bypass any measures we
                    may use to prevent or restrict access to Digital: Minimalist
                    To-do App (or other accounts, computer systems or networks
                    connected to Digital: Minimalist To-do App); (iv) run any
                    form of auto-responder or “spam” on Digital: Minimalist
                    To-do App; (v) use manual or automated software, devices, or
                    other processes to “crawl” or “spider” any web pages
                    associated with Digital: Minimalist To-do App, or any third
                    party web pages accessed through Digital: Minimalist To-do
                    App; (vi) harvest or scrape any Content from Digital:
                    Minimalist To-do App; or (vii) otherwise take any action in
                    violation of our guidelines and policies. c. You shall not
                    (directly or indirectly): (i) decipher, decompile,
                    disassemble, reverse engineer or otherwise attempt to derive
                    any source code or underlying ideas or algorithms of any
                    aspect, feature or part of Digital: Minimalist To-do App,
                    except to the limited extent applicable laws specifically
                    prohibit such restriction; (ii) modify, translate, or
                    otherwise create derivative works of any part of Digital:
                    Minimalist To-do App; or (iii) copy, rent, lease,
                    distribute, or otherwise transfer any of the rights that you
                    receive hereunder. You shall abide by all applicable local,
                    state, national and international laws and regulations. You
                    will comply with any technical restrictions of Digital:
                    Minimalist To-do App that allow you to use Digital:
                    Minimalist To-do App only in certain ways. d. We also
                    reserve the right to access, read, preserve, and disclose
                    any information as it reasonably believes is necessary to
                    (i) satisfy any applicable law, regulation, legal process or
                    governmental request; (ii) enforce these Terms of Use,
                    including investigation of potential violations hereof;
                    (iii) detect, prevent, or otherwise address fraud, security
                    or technical issues; (iv) respond to user support requests;
                    or (v) protect our rights, property or safety, or that of
                    our users and the public. This includes exchanging
                    information with other companies and organizations for fraud
                    protection and spam prevention.
                </Text>

                <Text style={styles.subTitle}>10. Third Party Services</Text>
                <Text style={styles.paragraf}>
                    Digital: Minimalist To-do App may permit you to access
                    content from or to link to other websites, services or
                    resources on the Internet (“Third Party Services”), and
                    those other websites, services or resources may contain
                    links to Digital: Minimalist To-do App. When you access
                    third party resources on the Internet, you do so at your own
                    risk. These other resources are not under our control and
                    you acknowledge that we are not responsible or liable for
                    the content, functions, accuracy, legality, appropriateness
                    or any other aspect of such websites or resources. Such
                    inclusion does not imply endorsement by us or any
                    association with our operators. You further acknowledge and
                    agree that we shall not be responsible or liable, directly
                    or indirectly, for any damage or loss caused or alleged to
                    be caused by or in connection with the use of or reliance on
                    any such Content, goods or services available on or through
                    any such website or resource.
                </Text>

                <Text style={styles.subTitle}>11. Termination</Text>
                <Text style={styles.paragraf}>
                    We may terminate your access to all or any part of Digital:
                    Minimalist To-do App at any time, with or without cause,
                    with or without notice, effective immediately, which may
                    result in the forfeiture and destruction of all information
                    associated with your Account. If you wish to terminate your
                    Account, you may do so by following the instructions in your
                    Account settings or by removing the Digital: Minimalist
                    To-do App from any device on which you have it installed.
                    All provisions of these Terms of Use which by their nature
                    should survive termination shall survive termination,
                    including without limitation, ownership provisions, warranty
                    disclaimers, indemnity and limitations of liability.
                </Text>

                <Text style={styles.subTitle}>12. Warranty Disclaimer</Text>
                <Text style={styles.paragraf}>
                    We have no special relationship with or fiduciary duty to
                    you. You acknowledge that we have no control over, and no
                    duty to take any action regarding: (1) which users gains
                    access to Digital: Minimalist To-do App; (2) what Content
                    you access via Digital: Minimalist To-do App; (3) what
                    effects the Content may have on you; (4) how you may
                    interpret or use the Content; or (5) what actions you may
                    take as a result of having been exposed to the Content. a.
                    You release us from all liability for you having acquired or
                    not acquired Content through Digital: Minimalist To-do App.
                    The Services may contain, or direct you to websites
                    containing, information that some people may find offensive
                    or inappropriate. We make no representations concerning any
                    Content contained in or accessed through Digital: Minimalist
                    To-do App, and Digital: Minimalist To-do App will not be
                    responsible or liable for the accuracy, copyright
                    compliance, legality or decency of material contained in or
                    accessed through Digital: Minimalist To-do App. b. Digital:
                    Minimalist To-do App AND ALL CONTENT ARE PROVIDED “AS IS”,
                    “AS AVAILABLE” AND WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
                    WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY AND
                    FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED
                    BY ANY COURSE OF PERFORMANCE OR USAGE OF TRADE, ALL OF WHICH
                    ARE EXPRESSLY DISCLAIMED. WE, AND OUR DIRECTORS, EMPLOYEES,
                    AGENTS, SUPPLIERS, PARTNERS AND CONTENT PROVIDERS DO NOT
                    WARRANT THAT: (I) Digital: Minimalist To-do App WILL BE
                    SECURE OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (II)
                    ANY DEFECTS OR ERRORS WILL BE CORRECTED; (III) ANY CONTENT
                    OR SOFTWARE AVAILABLE AT OR THROUGH Digital: Minimalist
                    To-do App IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR
                    (IV) THE RESULTS OF USING Digital: Minimalist To-do App WILL
                    MEET YOUR REQUIREMENTS. YOUR USE OF Digital: Minimalist
                    To-do App IS SOLELY AT YOUR OWN RISK. SOME STATES DO NOT
                    ALLOW LIMITATIONS ON IMPLIED WARRANTIES, SO THE FOREGOING
                    LIMITATIONS MAY NOT APPLY TO YOU.
                </Text>

                <Text style={styles.subTitle}>13. Indemnification</Text>
                <Text style={styles.paragraf}>
                    You shall defend, indemnify, and hold harmless us, our
                    affiliates and each of their respective employees,
                    contractors, directors, suppliers and representatives from
                    all liabilities, claims, and expenses, including reasonable
                    attorneys' fees, that arise from or relate to your use or
                    misuse of, or access to, Digital: Minimalist To-do App,
                    Content, or which otherwise arise from your User Content,
                    violation of these Terms of Use, or infringement by you, or
                    any third party using your Account, of any intellectual
                    property or other right of any person or entity. We reserve
                    the right to assume the exclusive defense and control of any
                    matter subject to indemnification by you, in which event you
                    will assist and cooperate with us in asserting any available
                    defenses.
                </Text>

                <Text style={styles.subTitle}>14. Limitation of Liability</Text>
                <Text style={styles.paragraf}>
                    IN NO EVENT SHALL WE, OUR AFFILIATES NOR ANY OF THEIR
                    RESPECTIVE DIRECTORS, EMPLOYEES, CONTRACTORS, AGENTS,
                    PARTNERS, SUPPLIERS, REPRESENTATIVES OR CONTENT PROVIDERS,
                    BE LIABLE UNDER CONTRACT, TORT, STRICT LIABILITY, NEGLIGENCE
                    OR ANY OTHER LEGAL OR EQUITABLE THEORY WITH RESPECT TO
                    TeuxDeux (I) FOR ANY LOST PROFITS, DATA LOSS, COST OF
                    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR SPECIAL,
                    DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL
                    DAMAGES OF ANY KIND WHATSOEVER, SUBSTITUTE GOODS OR SERVICES
                    (HOWEVER ARISING); (II) FOR ANY BUGS, VIRUSES, TROJAN
                    HORSES, OR THE LIKE (REGARDLESS OF THE SOURCE OF
                    ORIGINATION); (III) DAMAGES IN EXCESS OF THE GREATER OF $100
                    OR THE AMOUNT YOU PAID FOR TeuxDeux OR THE TeuxDeux
                    APPLICATION IN THE AGGREGATE; OR (IV) FOR ANY MATTER BEYOND
                    OUR REASONABLE CONTROL. SOME STATES DO NOT ALLOW THE
                    EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL
                    DAMAGES, SO THE ABOVE LIMITATIONS AND EXCLUSIONS MAY NOT
                    APPLY TO YOU.
                </Text>

                <Text style={styles.subTitle}>
                    15. Governing Law and Jurisdiction
                </Text>
                <Text style={styles.paragraf}>
                    These Terms of Use shall be governed by and construed in
                    accordance with the laws of the State of New York, including
                    its conflicts of law rules, and the United States of
                    America. You agree that any dispute arising from or relating
                    to the subject matter of these Terms of Use shall be
                    governed by the exclusive jurisdiction and venue of the
                    state and federal courts of New York County, New York.
                </Text>

                <Text style={styles.subTitle}>
                    16. Entire Agreement and Severability
                </Text>
                <Text style={styles.paragraf}>
                    These Terms of Use are the entire agreement between you and
                    us with respect to Digital: Minimalist To-do App, and
                    supersede all prior or contemporaneous communications and
                    proposals (whether oral, written or electronic) between you
                    and us with respect to Digital: Minimalist To-do App. If any
                    provision of these Terms of Use is found to be unenforceable
                    or invalid, that provision will be limited or eliminated to
                    the minimum extent necessary so that these Terms of Use will
                    otherwise remain in full force and effect and enforceable.
                </Text>

                <Text style={styles.subTitle}>17. Miscellaneous</Text>
                <Text style={styles.paragraf}>
                    a. Force Majeure. We shall not be liable for any failure to
                    perform our obligations hereunder where such failure results
                    from any cause beyond our reasonable control, including,
                    without limitation, mechanical, electronic or communications
                    failure or degradation. b. Assignment. These Terms of Use
                    are personal to you, and are not assignable, transferable or
                    sublicensable by you except with our prior written consent.
                    We may assign, transfer or delegate any of its rights and
                    obligations hereunder without consent. c. Agency. No agency,
                    partnership, joint venture, or employment relationship is
                    created as a result of these Terms of Use and neither party
                    has any authority of any kind to bind the other in any
                    respect. d. Notices. Unless otherwise specified in these
                    Term of Service, all notices under these Terms of Use will
                    be in writing and will be deemed to have been duly given
                    when received, if personally delivered or sent by certified
                    or registered mail, return receipt requested; when receipt
                    is electronically confirmed, if transmitted by facsimile or
                    e- mail; or the day after it is sent, if sent for next day
                    delivery by recognized overnight delivery service. e. No
                    Waiver. Our failure to enforce any part of these Terms of
                    Use shall not constitute a waiver of our right to later
                    enforce that or any other part of these Terms of Use. Waiver
                    of compliance in any particular instance does not mean that
                    we will do so in the future. In order for any waiver of
                    compliance with these Terms of Use to be binding, we must
                    provide you with written notice of such waiver, provided by
                    one of its authorized representatives. Headings. The section
                    and paragraph headings in these Terms of Use are for
                    convenience only and shall not affect their interpretation.
                    g. Contact. You may contact us: By e-mail
                    at feedback@digitaltodoapp.com
                </Text>
            </View>
        );
    }
    return <View></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 16,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 16,
    },
    paragraf: {
        marginBottom: 8,
    },
});

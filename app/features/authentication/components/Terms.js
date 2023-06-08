import React from 'react';

const Section = ({title, children}) => <section><h4>{title}</h4>{children}</section>;

const Subsection = ({tag, level, topic, children}) => {
  const indent = (level || 1) * 5;
  const style = {
    p: {textIndent: `${indent}%`},
    span: {textDecoration: 'underline'},
  };
  return (
    <p style={style.p}>
      {tag}&nbsp;&nbsp;&nbsp;<span style={style.span}>{topic}</span> {children}
    </p>
  );
};

const Term = ({term}) => <span className="bolded">&#8220;{term}&#8221;</span>;

export default function Terms() {
  return (
    <div className="read-window">
      <p>
        Welcome to Connors Group Software and Services (as defined below) offered by Connors &amp; Associates, LLC d/b/a Connors Group (<Term term="Connors Group" />) to You (as defined below). The terms and conditions of this Software and Services Agreement (<Term term="Agreement" />) constitute the agreement between Connors Group and You regarding our provision of Software and Services to You.
      </p>
      <p className="bolded">
        PLEASE READ ALL THE TERMS HEREOF COMPLETELY AND CAREFULLY BEFORE USING THE SOFTWARE AND SERVICES. THIS AGREEMENT SETS FORTH THE LEGALLY BINDING TERMS AND CONDITIONS FOR YOUR USE OF THE SOFTWARE AND SERVICES. YOUR USE OF THE SOFTWARE OR SERVICES CONSTITUTES YOUR CONSENT TO THE TERMS HEREOF.
      </p>
      <p className="bolded">
        BY ACCEPTING THIS AGREEMENT, EITHER BY CLICKING A BOX INDICATING YOUR ACCEPTANCE OR BY EXECUTING A PROPOSAL THAT REFERENCES THIS AGREEMENT, YOU AGREE TO THE TERMS HEREOF. IF YOU ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF A LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE AUTHORITY TO BIND SUCH ENTITY AND ITS AFFILIATES TO THESE TERMS AND CONDITIONS, IN WHICH CASE THE TERMS &quot;YOU&quot; OR &quot;YOUR&quot; SHALL REFER TO SUCH ENTITY AND ITS AFFILIATES. IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT AGREE WITH THESE TERMS AND CONDITIONS, YOU MUST NOT ACCEPT THIS AGREEMENT AND MAY NOT USE THE SOFTWARE OR THE SERVICES.
      </p>
      <p className="bolded">
        IF YOU REGISTER FOR A FREE TRIAL FOR SOFTWARE AND/OR SERVICES, THE APPLICABLE PROVISIONS HEREOF WILL ALSO GOVERN THAT FREE TRIAL.
      </p>
      <Section title="1. DEFINITIONS.">
        <Subsection tag="(a)">
          <Term term="Affiliate" /> means any entity that directly or indirectly controls, is controlled by, or is under common control with the subject entity. <Term term="Control" />, for purposes of this definition, means direct or indirect ownership or control of more than 50% of the voting interests of the subject entity.
        </Subsection>
        <Subsection tag="(b)">
          <Term term="Agreement" /> means this Software and Services Agreement and any amendment, schedule, Proposal, or exhibit executed in accordance with the terms hereof.
        </Subsection>
        <Subsection tag="(c)">
          <Term term="Contract Term" /> shall mean the period set forth in the applicable Proposal.
        </Subsection>
        <Subsection tag="(d)">
          <Term term="Documentation" /> means the applicable documentation for the Software and Services, and its usage guides and policies, as updated from time to time, accessible via connorsllc.com or by logging to the Software and/or Services.
        </Subsection>
        <Subsection tag="(e)">
          <Term term="Fees" /> means the fees payable by You to Connors Group hereunder and/or any applicable Proposal for Software and/or Services.
        </Subsection>
        <Subsection tag="(f)">
          <Term term="Hardware" /> means any computer hardware, database server, application server, network router, and/or any other equipment or devices necessary to run or access the Software and Services.
        </Subsection>
        <Subsection tag="(g)">
          <Term term="Intellectual Property Rights" /> means patents of any type, design rights, utility models or other similar invention rights, copyrights, mask work rights, trade secret or confidentiality rights, trademarks, trade names and service marks and any other intangible property rights, including applications and registrations for any of the foregoing, in any country, arising under statutory or common law or by contract and whether or not perfected, now existing or hereafter filed, issued, or acquired.
        </Subsection>
        <Subsection tag="(h)">
          <Term term="License Period" /> means the term of the non-exclusive license granted herein to You. The License Period begins upon delivery of the Software to You and the License Period shall be for the period designated in the applicable Proposal unless terminated in accordance with the provisions of this Agreement.  It may be possible to have more than one License Period in effect depending on the Software and Services designated in the Proposal(s).
        </Subsection>
        <Subsection tag="(i)">
          <Term term="Non-Connors Group Application" /> means a Web-based, mobile, offline or other software application functionality that is provided by You or a third party and interoperates with a Service, including, for example, an application that is developed by or for You.
        </Subsection>
        <Subsection tag="(j)">
          <Term term="Proposal" /> means an ordering document or online order specifying the Software and/or Services to be provided hereunder that is entered into between You and Connors Group or any of Connors Group’s Affiliates, including all documentation and supplements attached thereto.  By entering into a Proposal hereunder, an Affiliate agrees to be bound by the terms hereof as if it were an original party hereto.
        </Subsection>
        <Subsection tag="(k)">
          <Term term="Purchased Services" /> means Services that You or Your Affiliate purchase under a Proposal, as distinguished from those provided pursuant to a free trial.
        </Subsection>
        <Subsection tag="(l)">
          <Term term="Services" /> means the Software and services that are ordered by You under a Proposal or provided to You under a free trial, and made available online by Connors Group including, without limitation, the Software and any associated Connors Group offline or mobile components.
        </Subsection>
        <Subsection tag="(m)">
          <Term term="Software" /> means the executable code versions of the computer programs designated on the applicable Proposal, which is to be licensed by Connors Group to You.  The term &#8220;<span className="term">Software</span>&#8221; excludes any Third Party Software (as defined below).   The Software will either be accessible from Connor’s servers in a software-as-a-service (SaaS) model or installed directly on Your Hardware and You are responsible for maintaining your own database.    For SaaS models, Connors Group will maintain the databases necessary to support the functioning of the Software.
        </Subsection>
        <Subsection tag="(n)">
          <Term term="Updates" /> means software which enhances functionality that exists in the Your current version of Software for which you have a license.  Updates do not include software that adds new functionality (e.g., upgrades or new products) which is separate and independent of functionality that exists in Your current version of Software for which You have a license.
        </Subsection>
        <Subsection tag="(o)">
          <Term term="Use" /> means accessing and/or running the Software in accordance with the terms hereof and in the regular course of Your business.
        </Subsection>
        <Subsection tag="(p)">
          <Term term="User" /> means an individual who is authorized by You to use the Software or Services, for whom You have purchased a subscription (or in the case of any Services provided by Connors Group without charge, for whom Services have been provisioned), and to whom You (or, when applicable, Connors Group at Your request) have supplied a user identification and password (for Services utilizing authentication). Users may include, for example, Your employees, consultants, contractors and agents, and third parties with which You transact business.
        </Subsection>
        <Subsection tag="(q)">
          <Term term="You" /> or <Term term="Your" /> means the company or other legal entity for which you are accepting this Agreement, and Affiliates of that company or entity, which have signed a Proposal.
        </Subsection>
        <Subsection tag="(r)">
          <Term term="Your Data" /> means Your data that is transferred, received, or processed by the Software and/or Services.
        </Subsection>
      </Section>
      <Section title="2. FREE TRIAL.">
        <Subsection tag="(a)">
          If You register on Connors Group’s website for a free trial, Connors Group will make certain Services available to You on a trial basis free of charge until the earlier of (a) the end of the free trial period for which You registered to use the applicable Services, or (b) the start date of any Purchased Services ordered by You for such Services, or (c) termination by Connors Group in Connors Group’s sole discretion. Additional trial terms and conditions may appear on the trial registration web page. Any such additional terms and conditions are incorporated into this Agreement by reference and are legally binding.
        </Subsection>
        <Subsection tag="(b)">
          <span className="bolded">YOUR DATA ENTERED INTO THE SOFTWARE OR SERVICES, AND ANY CUSTOMIZATIONS MADE TO THE SOFTWARE OR SERVICES BY OR FOR YOU, DURING YOUR FREE TRIAL WILL BE PERMANENTLY LOST UNLESS YOU PURCHASE A SUBSCRIPTION TO THE SAME SERVICES AS THOSE COVERED BY THE TRIAL OR EXPORT SUCH DATA BEFORE THE END OF THE TRIAL PERIOD. TRANSFER OF YOUR DATA OR CUSTOMIZATIONS MADE DURING A FREE TRIAL TO A SERVICE THAT WOULD BE A DOWNGRADE FROM THAT COVERED BY THE TRIAL (e.g., FROM ENTERPRISE EDITION TO PROFESSIONAL EDITION) IS PROHIBITED AND ALL CUSTOMIZATIONS AND YOUR DATA WILL BE LOST IN SUCH EVENT.</span>
        </Subsection>
        <Subsection tag="(c)">
          NOTWITHSTANDING SECTION 10 (REPRESENTATIONS, WARRANTIES, EXCLUSIVE REMEDIES AND DISCLAIMERS), DURING THE FREE TRIAL THE SERVICES ARE PROVIDED &#8220;AS-IS&#8221; WITHOUT ANY WARRANTY.
        </Subsection>
      </Section>
      <Section title="3. GRANT OF LICENSE TO SOFTWARE AND SERVICES.">
        <Subsection tag="(a)" topic="Rights Granted.">
          Connors Group hereby grants a non-exclusive license to You for the Licensed Period to Use the Software and Services as set forth in the applicable Proposal, subject to the terms of this Agreement
        </Subsection>
        <Subsection tag="(b)" topic="Dual-Media Software.">
          You may receive the Software in more than one medium (electronic and on a CD, for example).  Receipt of the Software in more than a single medium does not expand the license rights granted to You hereunder. Your use of the Software is limited to the number of licenses acquired overall, regardless of number or type of medium on which it has been provided.
        </Subsection>
        <Subsection tag="(c)" topic="Restrictions.">
          In addition to other restrictions set forth in this Agreement, You may not (a) make the Software or Services available for use by others in any service bureau or similar arrangement; (b) distribute, sublicense, transfer (by operation of law or otherwise), sell, rent or lend the Software or Services to any third party; or (c) disassemble, decompile or &#8220;unlock&#8221;, or otherwise reverse translate or engineer the Software (except in European Union countries, to the extent allowed by law) or attempted in any manner to reconstruct or discovery any source code of underlying algorithms of the Software (except in European Union countries, to the extent allowed by law); (d) modify the Software or create any derivative work based on the Software; (e) remove or alter any marks or proprietary notices or labels contained in the Software; (f) use the Software in any manner that violates Intellectual Property Rights of Connors Group or any third party, or that violates applicable international, federal, state, or local law or regulation; (g) make any copies of the Software; (h) permit the Software or Services to be accessed or used by anyone other than its employees whose duties require such use or access or (i) Use the Software or Services in any other way which is inconsistent with the terms of this Agreement.  In addition, You will ensure that each person running/accessing the Software or Services has a unique username or password and that such passwords and usernames are not shared.
        </Subsection>
        <Subsection tag="(d)" topic="Title.">
          Connors Group owns and reserves all rights, including all Intellectual Property Rights, in and to the Software, the Services, and its Confidential Information, as defined below.  It is acknowledged that the foregoing contain the valuable proprietary material of Connors Group or its Connors Groups.  All rights in and to the Software, the Services, and Connors Group’s Confidential Information not specifically granted to You shall remain with Connors Group, or its Connors Groups.  You agree that You shall not acquire any rights in the Software, Services, and/or Connors Group Confidential Information other than as set forth herein.
        </Subsection>
        <Subsection tag="(e)" topic="Third-Party Software.">
          Any third-party owned software product included in the Software (<Term term="Third Party Software" />) is the property of the respective third-party owner or Connors Group and that You have no right or title, nor will You assert any right or title, in the same except as expressly granted in writing by the terms and conditions hereof, any Proposal, or such third-party’s license or purchase agreement as shall be expressly set forth by Connors Group in the applicable Proposal where such Third-Party Software is referenced.  All Third-Party Software provided to You hereunder shall be used only in accordance with the applicable license from the third party and only in conjunction with Software and Services.
        </Subsection>
        <Subsection tag="(f)" topic="Telerik Software.">
          The Software may include certain copyrighted software developed by Telerik and included in the Software via license to Connors Group (the &#8220;Telerik Software&#8221;).  You are not permitted to use the Telerik Software, or any portion thereof, for software or application development purposes unless You have separately purchased a developer license from Telerik for each of Your users.  Furthermore, You are not permitted to sublicense the Telerik Software to any third parties. All copyright and other intellectual property rights in the Telerik Software are retained by Telerik.
        </Subsection>
        <Subsection tag="(g)" topic="Data.">
          All Your Data is and shall remain the property of You and Connors Group’s right to use Your Data shall be limited to (a) the use reasonably necessary to perform its obligations, hereunder, including compliance with applicable law; and (b) the use of aggregated and anonymous Your Data; any work product developed by Connors Group using the aggregated and anonymous Your Data shall belong solely to Connors Group, You shall not have any rights in such work product.
        </Subsection>
        <Subsection tag="(h)" topic="License to Use Feedback.">
          You grant to Connors Group and Connors Group’s Affiliates a worldwide, perpetual, irrevocable, royalty-free license to use and incorporate into Connors Group’s and/or Connors Group’s Affiliates’ services any suggestion, enhancement request, recommendation, correction or other feedback provided by You or Users relating to the operation of Connors Group’s or Connors Group’s Affiliates’ services.
        </Subsection>
      </Section>
      <Section title="4. CONNORS GROUP’S RESPONSIBILITIES.">
        <Subsection tag="(a)" topic="Provision of Services.">
          Connors Group will (a) make the Services available to You pursuant hereto and the applicable Proposal, (b) provide applicable Connors Group standard support for the Services to You at no additional charge, and/or upgraded support if purchased, (c) use commercially reasonable efforts to make the Services available 24 hours per day, 7 days per week, except for: (i) planned downtime (of which Connors Group shall give advance electronic notice as provided in the Documentation), and (ii) any unavailability caused by circumstances beyond Connors Group’s reasonable control, including, for example, an act of God, act of government, flood, fire, earthquake, civil unrest, act of terror, strike or other labor problem (other than one involving Connors Group’s employees), Internet service provider failure or delay, Non-Connors Group Application, denial of service attack.
        </Subsection>
        <Subsection tag="(b)" topic="Protection of Your Data.">
          Connors Group will maintain administrative, physical, and technical safeguards for protection of the security, confidentiality and integrity of Your Data, as described in the Documentation.  Those safeguards will include, without limitation, measures for preventing access, use, modification or disclosure of Your Data by Connors Group’s personnel except (a) to provide the Purchased Services and prevent or address service or technical problems, (b) as compelled by law, or (c) as You expressly permit in writing.
        </Subsection>
        <Subsection tag="(c)" topic="Connors Group’s Personnel.">
          Connors Group will be responsible for the performance of Connors Group’s personnel (including Connors Group’s employees and contractors) and their compliance with Connors Group’s obligations hereunder, except as otherwise specified in this Agreement.
        </Subsection>
      </Section>
      <Section title="5. MAINTENANCE AND SUPPORT.">
        <Subsection tag="(a)" topic="Support Exclusions.">
          This Agreement includes support for the Software.  It does <em>not</em> include support for any Hardware or Your wireless network or internet connection. You are solely responsible for supporting these items.
        </Subsection>
        <Subsection tag="(b)" topic="Basic Maintenance Services.">
          Provided that You have timely paid all applicable fees and are using the Software and/or Services in accordance with the terms and conditions of this Agreement and any applicable Proposal, Connors Group will supply the following services to You:
        </Subsection>
        <Subsection level={2} tag="(i)" topic="Installation Assistance.">
          Connors Group shall provide to You telephone assistance for the installation and implementation of the Software and/or Services between the hours of 9 a.m. and 5 p.m. Eastern Standard Time (<Term term="EST" />), Monday through Friday, excluding public holidays.
        </Subsection>
        <Subsection level={2} tag="(ii)" topic="Remote Support.">
          Connors Group’s consultants shall be available to receive support requests via Connors Group’s email and web ticketing service between the hours of 9 a.m. and 5 p.m. EST, Monday through Friday, excluding public holidays.  All requests shall be investigated and if the request relates to the Services, or is directly caused by the Services, a ticket shall be generated and the request shall addressed and resolved as soon as commercially possible in accordance with Connors Group’s standard policies and procedures.  If Connors Group and You agree that onsite Support is required by a Connors Group authorized representative and/or consultant, additional charges, including, but not limited to, hourly labor, travel, meals, lodging and related Support expenses shall apply and be at the Your expense.
        </Subsection>
        <Subsection level={2} tag="(iii)" topic="Debugging.">
          Connors Group shall provide You such debugging as is necessary to correct any bugs or errors ensure to the extent commercially reasonable.
        </Subsection>
        <Subsection level={2} tag="(iv)" topic="Updates.">
          Connors Group shall furnish Updates, which Connors Group, in its sole discretion, deems to be logical improvements to the Software previously supplied to the You under the current license, and which Connors Group does not separately price or market.
        </Subsection>
        <Subsection tag="(c)">
          Notwithstanding any other provisions herein, the basic maintenance services described above (<Term term="Basic Maintenance Services" />) shall only include maintenance and support with respect to the then two most recent versions of the Software. The Basic Maintenance Services shall only include maintenance and support for IE 11 (list of specific web browsers supported may be changed from time to time in the sole discretion of Connors Group) and shall not be offered for website browsers while in compatibility mode. The cost of the Basic Maintenance Services shall be as set forth in the applicable Proposal and shall be pro-rated for any partial periods. Unless otherwise expressly agreed in the applicable Proposal, any additional services agreed to including, without limitation, consulting services, shall be billable to You at Connors Group’s then existing hourly rates, based on a minimum per charge of one hour. Any time incurred by Connors Group in diagnosing or repairing problems that are not expressly covered by a Proposal and or any time incurred as a result of Your errors or failures to perform its obligations hereunder or any Proposal or occasioned by failures of Your Hardware and/or systems, shall be billable to You at Connors Group’s then existing hourly rates, based on a minimum per charge of one hour. Travel time to and from Your site shall be billable and You shall reimburse Connors Group for any expense incurred unless otherwise stated in the applicable Proposal.  Connors Group will not be responsible for solving any problems that are not inherent to the Software. Connors Group does not agree to accept or perform requests for enhancements except as provided for in a separate agreement.  Problems that are rooted in Your Hardware or other software programs are not covered by this Agreement.  Connors Group makes no guarantees with regard to the support outlined in this Agreement above and beyond any the warranties expressly made by Connors Group in this Agreement.
        </Subsection>
      </Section>
      <Section title="6.  USE OF SERVICES AND CONTENT.">
        <Subsection tag="(a)" topic="Subscriptions.">
          Unless otherwise provided in the applicable Proposal or Documentation, (a) access to the Software and Services is purchased via subscriptions, (b) subscriptions may be added during a subscription term as set forth in the applicable Proposal at the same pricing as the underlying subscription pricing, prorated for the portion of that subscription term remaining at the time the subscriptions are added, and (c) any added subscriptions will terminate on the same date as the underlying subscriptions. Any updates or enhancements to the Software or Services can be provided to You via execution of a new Proposal.
        </Subsection>
        <Subsection tag="(b)" topic="Usage Limits.">
          The Services are subject to usage limits, including, for example, the quantities specified in the Proposal. Unless otherwise specified, (a) a quantity in an Proposal refers to Users, and the Services or Software may not be accessed by more than that number of Users, (b) a User’s password may not be shared with any other individual, and (c) except as set forth in a Proposal, a User identification may only be reassigned to a new individual replacing one who will no longer use the Software and/or Services. If You exceed a contractual usage limit, Connors Group may work with You to address the overage so that the number of Users conforms to the limit. If, notwithstanding Connors Group’s efforts, You are unable or unwilling to abide by a contractual usage limit, You will execute a Proposal for additional quantities of the applicable Services or Software promptly upon Connors Group’s request, and/or pay any invoice for excess usage in accordance with Section 8 (Payment Terms).
        </Subsection>
        <Subsection tag="(c)" topic="Your Responsibilities.">
          You will (a) be responsible for Users’ compliance with this Agreement and all applicable Documentation and Proposal, (b) be responsible for the accuracy, quality and legality of Your Data and the means by which You acquired Your Data, (c) use commercially reasonable efforts to prevent unauthorized access to or use of Software and Services, and notify Connors Group promptly of any such unauthorized access or use, (d) use the Software and Services only in accordance with this Agreement and all applicable Documentation and Proposal, and any and all applicable laws and government regulations, and (e) comply with terms of service of any Non-Connors Group Applications with which You use Services or Content.
        </Subsection>
        <Subsection tag="(d)" topic="Usage Restrictions.">
          You will not (a) make any Services or Software available to, or use any Services or Software for the benefit of, anyone other than You or Users, unless expressly stated otherwise in a Proposal; (b) sell, resell, license, sublicense, distribute, make available, rent or lease the Services or Software, or include the Services or Software in a service bureau or outsourcing offering; (c) use the Services or Software to store or transmit infringing, libelous, or otherwise unlawful or tortious material, or to store or transmit material in violation of third-party privacy rights or third-party Intellectual Property Rights; (d) use the Services or Software to store or transmit Malicious Code, (e) interfere with or disrupt the integrity or performance of the Software, Services, or any third-party data contained therein; (f) attempt to gain unauthorized access to the Services or Software or any related systems or networks; (g) permit direct or indirect access to or use of the Services or Software in a way that circumvents a contractual usage limit, or use the Services, Software, or Connors Group’s Intellectual Property Rights except as permitted under this Agreement or any applicable Proposal or Documentation; (h) copy the Services, Software, or any part, feature, function or user interface thereof; (i) frame or mirror any part of the Services or Software, other than framing on Your own intranets or otherwise for Your own internal business purposes or as permitted herein, any applicable Proposal, or the Documentation; (j) access the Services or Software in order to build a competitive product or service or to benchmark with a third-party product or service not expressly permitted hereunder, any applicable Proposal or Documentation; or (k) reverse engineer the Software or Services (to the extent such restriction is permitted by law). Any use of the Software or Services in breach of this Agreement and/or any applicable Documentation or Proposal by You or Users that in Connors Group’s judgment threatens the security, integrity or availability of Connors Group’s services, may result in Connors Group’s immediate suspension of the Software and/or Services.  In the event of such a suspension, Connors Group will use commercially reasonable efforts under the circumstances to provide You with notice and an opportunity to remedy such violation or threat.
        </Subsection>
        <Subsection tag="(e)" topic="Removal of Non-Connors Group Applications.">
          If Connors Group is required by a Connors Group to remove, or receives information that Non-Connors Group Applications provided to You may violate applicable law or third-party rights, Connors Group may so notify You and in such event You will promptly remove such Non-Connors Group Applications from Your systems. If Connors Group receives information that a Non-Connors Group Application hosted on the Software or Services by You may violate applicable law or third-party rights, Connors Group may so notify You and in such event You will promptly disable such Non-Connors Group Application or modify the Non-Connors Group Application to resolve the potential violation. If You do not take required action in accordance with the above, Connors Group may disable the applicable Software, Services and/or Non-Connors Group Application until the potential violation is resolved.
        </Subsection>
      </Section>
      <Section title="7.  NON-CONNORS GROUP PROVIDERS.">
        <Subsection tag="(a)" topic="Non-Connors Group Applications Generally.">
          Connors Group or third parties may make available certain third-party products or services, including, for example, Non-Connors Group Applications, implementations, or other consulting services. Any acquisition by You of such products or services, and any exchange of data between You and any non-Connors Group provider, product or service is solely between You and the applicable non-Connors Group provider. Connors Group does not warrant or support Non-Connors Group Applications or other non-Connors Group products or services, whether or not they are designated by Connors Group as “certified” or otherwise, unless expressly provided otherwise in a Proposal.
        </Subsection>
        <Subsection tag="(b)" topic="Non-Connors Group Applications and Your Data.">
          If You choose to use a Non-Connors Group Application with the Software and/or Services, You grant Connors Group permission to allow the Non-Connors Group Application and its provider to access Your Data as required for the interoperation of that Non-Connors Group Application with the Service. Connors Group is not responsible for any disclosure, modification or deletion of Your Data resulting from access by such Non-Connors Group Application or its provider.
        </Subsection>
        <Subsection tag="(c)" topic="Integration with Non-Connors Group Applications.">
          The Services or Software may contain features designed to interoperate with Non-Connors Group Applications. To use such features, You may be required to obtain access to such Non-Connors Group Applications from their providers, and may be required to grant Connors Group access to Your account(s) on such Non-Connors Group Applications. Connors Group cannot guarantee the continued availability of such features, and may cease providing them without entitling You to any refund, credit, or other compensation, if for example and without limitation, the provider of a Non-Connors Group Application ceases to make the Non-Connors Group Application available for interoperation with the corresponding Service features in a manner acceptable to Connors Group.
        </Subsection>
      </Section>
      <Section title="8.  PAYMENT TERMS.">
        <Subsection tag="(a)" topic="General.">
          You shall pay Connors Group the Fees for the Software and/or Services in the amounts set forth in the applicable Proposal.  All undisputed invoices shall be due and payable within 15 days after receipt of Connors Group’s invoice. In all cases, the amount of the Fees will be paid by the You to Connors Group in full unless disputed in writing in good faith by You. Interest shall accrue on all amounts past due at a rate of 18% per annum.  All shipments of any media, if applicable, will be FOB Origin.  Quantities purchased cannot be decreased during the relevant subscription term.
        </Subsection>
        <Subsection tag="(b)" topic="Invoicing and Payment.">
          You will provide Connors Group with valid and updated credit card information, or with a valid purchase order or alternative document reasonably acceptable to Connors Group. If You provide credit card information to Connors Group, You authorize Connors Group to charge such credit card for all Purchased Services listed in the applicable Proposal for the subscription terms as set forth in Section 13(b) (Term of Purchased  Subscriptions). Such charges shall be made in advance, either annually or in accordance with any different billing frequency stated in the applicable Proposal. If the applicable Proposal specifies that payment will be by a method other than a credit card, Connors Group will invoice You in advance and otherwise in accordance with the relevant Proposal. You are responsible for providing complete and accurate billing and contact information to Connors Group and notifying Connors Group of any changes to such information.
        </Subsection>
        <Subsection tag="(c)" topic="Overdue Charges.">
          If any invoiced amount is not received by Connors Group by the due date, then without limiting Connors Group’s rights or remedies, Connors Group may condition future subscription renewals and Proposals on payment terms shorter than those specified in Section 8 (Invoicing and Payment).
        </Subsection>
        <Subsection tag="(d)" topic="Suspension of Service and Acceleration.">
          If any amount owing by You under this or any other agreement for Connors Group’s services is 30 or more days overdue (or 10 or more days overdue in the case of amounts You have authorized Connors Group to charge to Your credit card), Connors Group may, without limiting Connors Group’s other rights and remedies, accelerate Your unpaid fee obligations under such agreements so that all such obligations become immediately due and payable, and suspend Connors Group’s services to You until such amounts are paid in full. Other than for customers paying by credit card or direct debit whose payment has been declined, Connors Group will give You at least 10 days’ prior notice that Your account is overdue, in accordance with Section 14 (Notices, Governing Law and Jurisdiction) for billing notices, before suspending services to You.
        </Subsection>
        <Subsection tag="(e)" topic="Payment Disputes.">
          Connors Group will not exercise Connors Group’s rights under Section 8(c) (Overdue Charges) or Section 8(D) (Suspension of Service and Acceleration) above if You are disputing the applicable charges reasonably and in good faith and are cooperating diligently to resolve the dispute.
        </Subsection>
        <Subsection tag="(f)" topic="Taxes.">
          Connors Group’s fees do not include any taxes, levies, duties or similar governmental assessments of any nature, including, for example, value-added, sales, use or withholding taxes, assessable by any jurisdiction whatsoever (collectively, <Term term="Taxes" />). You are responsible for paying all Taxes associated with Your purchases hereunder. If Connors Group have the legal obligation to pay or collect Taxes for which You are responsible under this Section, Connors Group will invoice You and You will pay that amount unless You provide Connors Group with a valid tax exemption certificate authorized by the appropriate taxing authority. For clarity, Connors Group is solely responsible for taxes assessable against Connors Group based on Connors Group’s income, property and employees.
        </Subsection>
        <Subsection tag="(g)" topic="Future Functionality.">
          You agree that Your purchases are not contingent on the delivery of any future functionality or features, or dependent on any oral or written public comments made by Connors Group regarding future functionality or features.
        </Subsection>
      </Section>
      <Section title="9. CONFIDENTIALLITY">
        <Subsection tag="(a)" topic="Definition.">
          <Term term="Confidential Information" /> means all information disclosed by a party (<Term term="Disclosing Party" />) to the other party (<Term term="Receiving Party" />), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure. Your Confidential Information includes Your Data; Connors Group’s Confidential Information includes the Services and Content; and Confidential Information of each party includes the terms and conditions of this Agreement and any applicable Proposal (including pricing), as well as business and marketing plans, technology and technical information, product plans and designs, and business processes disclosed by such party. However, Confidential Information does not include any information that (i) is or becomes generally known to the public without breach of any obligation owed to the Disclosing Party, (ii) was known to the Receiving Party prior to its disclosure by the Disclosing Party without breach of any obligation owed to the Disclosing Party, (iii) is received from a third party without breach of any obligation owed to the Disclosing Party, or (iv) was independently developed by the Receiving Party.
        </Subsection>
        <Subsection tag="(b)" topic="Confidentiality Obligations.">
          The Receiving Party will use the same degree of care that it uses to protect the confidentiality of its own confidential information of like kind (but not less than reasonable care) to (i) not use any Confidential Information of the Disclosing Party for any purpose outside the scope of this Agreement and (ii) except as otherwise authorized by the Disclosing Party in writing, limit access to Confidential Information of the Disclosing Party to those of its and its Affiliates’ employees and contractors who need that access for purposes consistent with this Agreement and who have signed confidentiality agreements with the Receiving Party containing protections not materially less protective of the Confidential Information than those herein. Neither party will disclose the terms of this Agreement or any Proposal to any third party other than its Affiliates, legal counsel and accountants without the other party’s prior written consent, provided that a party that makes any such disclosure to its Affiliate, legal counsel or accountants will remain responsible for such Affiliate’s, legal counsel’s or accountant’s compliance with this “Confidentiality” section. Notwithstanding the foregoing, Connors Group may disclose the terms of this Agreement and any applicable Proposal to a subcontractor or Non-Connors Group Application Provider to the extent necessary to perform Connors Group’s obligations to You under this Agreement, under terms of confidentiality materially as protective as set forth herein.
        </Subsection>
        <Subsection tag="(c)" topic="Compelled Disclosure.">
          The Receiving Party may disclose Confidential Information of the Disclosing Party to the extent compelled by law to do so, provided the Receiving Party gives the Disclosing Party prior notice of the compelled disclosure (to the extent legally permitted) and reasonable assistance, at the Disclosing Party&apos;s cost, if the Disclosing Party wishes to contest the disclosure. If the Receiving Party is compelled by law to disclose the Disclosing Party’s Confidential Information as part of a civil proceeding to which the Disclosing Party is a party, and the Disclosing Party is not contesting the disclosure, the Disclosing Party will reimburse the Receiving Party for its reasonable cost of compiling and providing secure access to that Confidential Information.
        </Subsection>
      </Section>
      <Section title="10.  REPRESENTATIONS, WARRANTIES, EXCLUSIVE REMEDIES AND DISCLAIMERS.">
        <Subsection tag="(a)" topic="Representations.">
          Each party represents that it has validly entered into this Agreement and has the legal power to do so.
        </Subsection>
        <Subsection tag="(b)" topic="Connors Group&apos;s Warranties.">
          Connors Group warrants that during an applicable subscription term (a) this Agreement, the Proposal, and any applicable Documentation will accurately describe the applicable administrative, physical, and technical safeguards for protection of the security, confidentiality and integrity of Your Data, (b) Connors Group will not materially decrease the overall security of the Software or Services, (c) the Software will substantially perform when operated in the intended environment for a period of 365 days from the date of delivery/accessibly; (d) the Services will perform materially in accordance with the applicable Documentation, and (e) subject to the “Integration with Non-Connors Group Applications” section above, Connors Group will not materially decrease the overall functionality of the Services. For any breach of a warranty above, Your exclusive remedies are those described in the “Termination” and “Refund or Payment upon Termination” sections below.  At Connors Group’s option, Connors Group shall have the option to repair or replace any defective Software.  If Connors Group elects to replace or repair any defective Software, this shall be Your sole remedy.
        </Subsection>
        <Subsection tag="(c)" topic="Disclaimers.">
          EXCEPT AS EXPRESSLY PROVIDED HEREIN, NEITHER PARTY MAKES ANY WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, AND EACH PARTY SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW. CONTENT AND BETA SERVICES ARE PROVIDED “AS IS,” EXCLUSIVE OF ANY WARRANTY WHATSOEVER. EACH PARTY DISCLAIMS ALL LIABILITY AND INDEMNIFICATION OBLIGATIONS FOR ANY HARM OR DAMAGES CAUSED BY ANY THIRD-PARTY HOSTING PROVIDERS.
        </Subsection>
      </Section>
      <Section title="11. MUTUAL INDEMNIFICATION.">
        <Subsection tag="(a)" topic="Indemnification by Connors Group.">
          Connors Group will defend You against any claim, demand, suit or proceeding made or brought against You by a third party alleging that the Software or Services infringes or misappropriates any third party’s Intellectual  Property Rights (a <Term term="Claim Against You" />), and will indemnify You from any damages, attorney fees and costs finally awarded against You as a result of, or for amounts paid by You under a settlement approved by Connors Group in writing of, a Claim Against You, provided You (a) promptly give Connors Group written notice of the Claim Against You, (b) give Connors Group sole control of the defense and settlement of the Claim Against You (except that Connors Group may not settle any Claim Against You unless it unconditionally releases You of all liability), and (c) give Connors Group all reasonable assistance, at Connors Group’s expense. If Connors Group receives information about an infringement or misappropriation claim related to the Software or Services, Connors Group may in Connors Group’s discretion and at no cost to You (i) modify the Software or Services so that they are no longer claimed to infringe or misappropriate, without breaching Connors Group’s warranties under Section 10 above, (ii) obtain a license for Your continued use of the Software or Services in accordance with this Agreement, or (iii) terminate Your subscriptions for the Software or Services upon 30 days’ written notice and refund You any prepaid fees covering the remainder of the term of the terminated subscriptions. The above defense and indemnification obligations do not apply to the extent a Claim Against You arises from Your Use of the Software or Services in violation hereof, any applicable Proposal, or any applicable Documentation.
        </Subsection>
        <Subsection tag="(b)" topic="Indemnification by You.">
          You will defend Connors Group against any claim, demand, suit or proceeding made or brought against Connors Group by a third party alleging that any of Your Data infringes or misappropriates such third party’s intellectual property rights, or arising from Your use of the Services or Content in violation of the Agreement, the Documentation, Proposal or applicable law (each a “Claim Against Connors Group”), and You will indemnify Connors Group from any damages, attorney fees and costs finally awarded against Connors Group as a result of, or for any amounts paid by Connors Group under a settlement approved by You in writing of, a Claim Against Connors Group, provided Connors Group (a) promptly give You written notice of the Claim Against Connors Group, (b) give You sole control of the defense and settlement of the Claim Against Connors Group (except that You may not settle any Claim Against Connors Group unless it unconditionally releases Connors Group of all liability), and (c) give You all reasonable assistance, at Your expense.
        </Subsection>
        <Subsection tag="(c)" topic="Exclusive Remedy.">
          This Section 11 states the indemnifying party’s sole liability to, and the indemnified party’s exclusive remedy against, the other party for any type of claim described in this Section 11.
        </Subsection>
      </Section>
      <Section title="12.  LIMITATION OF LIABILITY.">
        <Subsection tag="(a)" topic="Limitation of Liability.">
          IN NO EVENT SHALL THE AGGREGATE LIABILITY OF EACH PARTY TOGETHER WITH ALL OF ITS AFFILIATES ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED THE TOTAL AMOUNT PAID BY YOU AND YOUR AFFILIATES HEREUNDER FOR THE SOFTWARE AND/OR SERVICES GIVING RISE TO THE LIABILITY IN THE 12 MONTHS PRECEDING THE FIRST INCIDENT OUT OF WHICH THE LIABILITY AROSE. THE FOREGOING LIMITATION WILL APPLY WHETHER AN ACTION IS IN CONTRACT OR TORT AND REGARDLESS OF THE THEORY OF LIABILITY, BUT WILL NOT LIMIT YOUR AND YOUR AFFILIATES’ PAYMENT OBLIGATIONS HEREUNDER.
        </Subsection>
        <Subsection tag="(b)" topic="Exclusion of Consequential and Related Damages.">
          IN NO EVENT WILL EITHER PARTY OR ITS AFFILIATES HAVE ANY LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT FOR ANY LOST PROFITS, DATA, REVENUES, GOODWILL, OR INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, COVER, BUSINESS INTERRUPTION OR PUNITIVE DAMAGES, WHETHER AN ACTION IS IN CONTRACT OR TORT AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF A PARTY OR ITS AFFILIATES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR IF A PARTY’S OR ITS AFFILIATES’ REMEDY OTHERWISE FAILS OF ITS ESSENTIAL PURPOSE. THE FOREGOING DISCLAIMER WILL NOT APPLY TO THE EXTENT PROHIBITED BY LAW.
        </Subsection>
      </Section>
      <Section title="13.  TERM AND TERMINATION.">
        <Subsection tag="(a)" topic="Term of Agreement.">
          This Agreement commences on the date You first accept it and continues until all subscriptions hereunder have expired or have been terminated.
        </Subsection>
        <Subsection tag="(b)" topic="Term of Purchased Subscriptions.">
          The term of each subscription shall be as specified in the applicable Proposal. Except as otherwise specified in a Proposal, subscriptions will automatically renew for additional periods equal to the expiring subscription term or one year (whichever is shorter), unless either party gives the other notice of non-renewal at least 30 days before the end of the relevant subscription term. The per- unit pricing during any renewal term will increase by up to 7% above the applicable pricing in the prior term, unless Connors Group provide You notice of different pricing at least 60 days prior to the applicable renewal term. Except as expressly provided in the applicable Proposal, renewal of promotional or one-time priced subscriptions will be at Connors Group’s applicable list price in effect at the time of the applicable renewal. Notwithstanding anything to the contrary, any renewal in which subscription volume for any Services has decreased from the prior term will result in re-pricing at renewal without regard to the prior term’s per-unit pricing.
        </Subsection>
        <Subsection tag="(c)" topic="Termination.">
          A party may terminate this Agreement for cause (i) upon 30 days written notice to the other party of a material breach if such breach remains uncured at the expiration of such period, or (ii) if the other party becomes the subject of a petition in bankruptcy or any other proceeding relating to insolvency, receivership, liquidation or assignment for the benefit of creditors.
        </Subsection>
        <Subsection tag="(d)" topic="Refund or Payment upon Termination.">
          If this Agreement is terminated by You in accordance with this Section 13 for cause, Connors Group will refund You any prepaid fees covering the remainder of the term of all Statements of Work after the effective date of termination. If this Agreement is terminated by Connors Group for cause in accordance with Section 13(c), You will pay any unpaid fees covering the remainder of the term of all Statements of Work. In no event will termination relieve You of Your obligation to pay any fees payable to Connors Group for the period prior to the effective date of termination.
        </Subsection>
        <Subsection tag="(e)" topic="Your Data Portability and Deletion.">
          Upon request by You made within 30 days after the effective date of termination or expiration hereof, Connors Group will make Your Data available to You for export or download as provided in the applicable Proposal or Documentation. After such 30-day period, Connors Group will have no obligation to maintain or provide any Your Data, and as provided in the Proposal or Documentation will thereafter delete or destroy all copies of Your Data in Connors Group’s systems or otherwise in Connors Group’s possession or control, unless legally prohibited.
        </Subsection>
        <Subsection tag="(f)" topic="Surviving Provisions.">
          The sections titled &#8220;Fees and Payment&#8221;, &#8220;Proprietary Rights and Licenses&#8221;, &#8220;Confidentiality&#8221;, &#8220;Disclaimers&#8221;, &#8220;Mutual Indemnification&#8221;, &#8220;Limitation of Liability&#8221;, &#8220;Refund or Payment upon Termination&#8221;, &#8220;Customer Data Portability and Deletion&#8221;, &#8220;Removal of Non-Connors Group Applications&#8221;, &#8220;Surviving Provisions&#8221; and &#8220;General Provisions&#8221; will survive any termination or expiration of this Agreement.
        </Subsection>
      </Section>
      <Section title="14.  NOTICES, GOVERNING LAW AND JURISDICTION.">
        <Subsection tag="(a)" topic="Notices.">
          All notices under this Agreement must be in writing and sent either by hand delivery; certified mail, return receipt requested; overnight courier; or by facsimile (with a confirming copy by certified mail or overnight courier) and will be effective when received by such party at the location(s) listed in the applicable Proposal and/or the corporate headquarters for such party.
        </Subsection>
        <Subsection tag="(b)" topic="Governing Law.">
          This Agreement shall be a contract under the laws of the Commonwealth of Pennsylvania and for all purposes shall be governed by and construed and enforced in accordance with the laws of such Commonwealth.  Any and all disputes arising out of, or in connection with, this Agreement including, without limitation, any claim regarding its subject matter, formation, validity, termination or any breach hereof, whether based in contract, tort or otherwise shall be governed by, and construed and enforced in accordance with, the laws of the Commonwealth of Pennsylvania, excluding the Commonwealth’s choice of law principles.
        </Subsection>
        <Subsection tag="(c)" topic="Jurisdiction.">
          Each of the parties consents and voluntarily submits to personal jurisdiction in the Commonwealth of Pennsylvania and in the courts in such Commonwealth located in Allegheny County and the United States District Court for the Western District of Pennsylvania in any proceeding dispute or claim arising out of or in connection herewith, including any dispute or claim regarding its subject matter, formation, validity, termination or breach thereof, whether sounding in contract, tort, or otherwise, and any such proceeding, dispute or claim shall be decided solely and exclusively by the state or federal courts located in Allegheny County, Pennsylvania and in no other. In the event of an alleged breach hereof, the prevailing party shall be entitled to reimbursement of all of its costs and expenses, including reasonable attorneys’ fees, incurred in connection with such breach, dispute, claim or litigation, including any appeal therefrom.  For purposes of this Section, the determination of which party is to be considered the prevailing party shall be decided by the court of competent jurisdiction that resolves such dispute, claim or litigation.
        </Subsection>
        <Subsection tag="(d)" topic="No Agency.">
          For the avoidance of doubt, Connors Group is entering into this Agreement as principal and not as agent for any other company. Subject to any permitted Assignment hereunder, the obligations owed by Connors Group under this Agreement shall be owed to You solely by Connors Group and the obligations owed by You under this Agreement shall be owed solely to Connors Group.
        </Subsection>
      </Section>
      <Section title="15. GENERAL PROVISIONS.">
        <Subsection tag="(a)" topic="Export Compliance.">
          The Services, Software, other technology Connors Group make available, and derivatives thereof may be subject to export laws and regulations of the United States and other jurisdictions. You will fully comply with all relevant export laws and regulations, including but not limited to the U.S. Export Administration Regulations and Executive Orders (“Export Controls”). You warrants that You are  not a person, company, or destination restricted or prohibited by Export Controls (“Restricted Person”). You will not, directly or indirectly, export, re-export, divert, or transfer the Software, any portion thereof or any materials, items, or technology relating to Connors Group’s business or related technical data, or any direct product thereof to any Restricted Person.
        </Subsection>
        <Subsection tag="(b)" topic="Entire Agreement and Order of Precedence.">
          This Agreement is the entire agreement between You and Connors Group regarding Your use of the Services and Software and supersedes all prior and contemporaneous agreements, proposals or representations, written or oral, concerning its subject matter. Except as otherwise provided herein, no modification, amendment, or waiver of any provision hereof will be effective unless in writing and signed by the party against whom the modification, amendment or waiver is to be asserted. The parties agree that any term or condition stated in Your purchase order or in any other of Your order Documentation (excluding Statements of Work) is void. In the event of any conflict or inconsistency among the following documents, the order of precedence shall be: (1) the applicable Proposal, (2) this Agreement, and (3) the Documentation.
        </Subsection>
        <Subsection tag="(c)" topic="Assignment.">
          You may not assign any of its rights or obligations hereunder, whether by operation of law or otherwise, without Connors Group’s prior written consent (not to be unreasonably withheld); provided, however, You may assign this Agreement in its entirety (together with all Statements of Work), without the other party’s consent to an Affiliate or in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of its assets. Notwithstanding the foregoing, if You are acquired by, sells substantially all of its assets to, or undergoes a change of control in favor of, a direct competitor of Connors Group, then You may terminate this Agreement upon written notice. In the event of such a termination, Connors Group will refund to You any prepaid fees allocable to the remainder of the term of all subscriptions for the period after the effective date of such termination.  Connors Group shall have the right to assign this Agreement to any Connors Group Affiliate.  Subject to the foregoing, this Agreement will bind and inure to the benefit of the parties, their respective successors and permitted assigns.
        </Subsection>
        <Subsection tag="(d)" topic="Relationship of Parties.">
          The parties are independent contractors. This Agreement does not create a partnership, franchise, joint venture, agency, fiduciary or employment relationship between the parties.
        </Subsection>
        <Subsection tag="(e)" topic="Third-Party Beneficiaries.">
          There are no third-party beneficiaries under this Agreement.
        </Subsection>
        <Subsection tag="(f)" topic="Waiver.">
          No failure or delay by either party in exercising any right under this Agreement will constitute a waiver of that right.
        </Subsection>
        <Subsection tag="(g)" topic="Severability.">
          If any provision hereof is held by a court of competent jurisdiction to be contrary to law, the provision will be deemed null and void, and the remaining provisions under this Agreement will remain in effect.
        </Subsection>
        <Subsection tag="(h)" topic="Conflicting Terms.">
          Each Proposal as well as any schedules identified on said Proposal shall be a part of and governed by the terms and conditions of this Agreement.  If there is a conflict between this Agreement and any Proposal and/or schedule, the terms of this Agreement shall control.
        </Subsection>
      </Section>
    </div>
  );
}

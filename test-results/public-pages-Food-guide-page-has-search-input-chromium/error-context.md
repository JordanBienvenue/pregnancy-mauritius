# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Food guide page >> has search input
- Location: e2e/public-pages.spec.ts:53:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('input[type="text"], input[type="search"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('input[type="text"], input[type="search"]').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Manman Moris" [ref=e5] [cursor=pointer]:
        - /url: /en
        - img [ref=e7]
        - generic [ref=e9]: Manman Moris
      - navigation [ref=e10]:
        - link "Tracker" [ref=e11] [cursor=pointer]:
          - /url: /en/tracker
          - text: Tracker
        - link "Directory" [ref=e12] [cursor=pointer]:
          - /url: /en/directory
          - text: Directory
        - link "Community" [ref=e13] [cursor=pointer]:
          - /url: /en/forum
          - text: Community
        - button "Resources" [ref=e15]:
          - text: Resources
          - img [ref=e16]
        - button "Services" [ref=e19]:
          - text: Services
          - img [ref=e20]
      - generic [ref=e22]:
        - combobox "Select language" [ref=e23]:
          - img
          - generic [ref=e24]: en
          - img: ▼
        - textbox [ref=e25]: en
        - generic [ref=e26]:
          - button "Log in" [ref=e27] [cursor=pointer]
          - button "Sign up" [ref=e28] [cursor=pointer]
  - main [ref=e29]:
    - generic [ref=e30]:
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]:
            - img
            - text: 36 foods reviewed
          - heading "Safe Food Guide" [level=1] [ref=e38]
          - paragraph [ref=e39]: Which Mauritian foods are safe during pregnancy?
        - generic [ref=e41]:
          - img [ref=e42]
          - textbox "Search for a food..." [ref=e45]
        - generic [ref=e46]:
          - generic [ref=e47]:
            - generic [ref=e48]: "17"
            - generic [ref=e49]: Safe
          - generic [ref=e51]:
            - generic [ref=e52]: "10"
            - generic [ref=e53]: With caution
          - generic [ref=e55]:
            - generic [ref=e56]: "9"
            - generic [ref=e57]: Avoid
      - generic [ref=e61]:
        - tablist [ref=e62]:
          - tab "All (36)" [selected] [ref=e63]
          - tab "Safe (17)" [ref=e64]:
            - img
            - text: Safe (17)
          - tab "With caution (10)" [ref=e65]:
            - img
            - text: With caution (10)
          - tab "Avoid (9)" [ref=e66]:
            - img
            - text: Avoid (9)
        - tabpanel "All (36)" [ref=e67]:
          - generic [ref=e69]:
            - generic [ref=e70]:
              - generic [ref=e71]:
                - img [ref=e72]
                - heading "Safe" [level=3] [ref=e75]
                - generic [ref=e76]: "17"
              - generic [ref=e77]:
                - generic [ref=e81]:
                  - generic [ref=e82]:
                    - generic [ref=e83]:
                      - img [ref=e85]
                      - heading "Dal Puri" [level=4] [ref=e95]
                    - img [ref=e96]
                  - generic [ref=e99]:
                    - generic [ref=e100]: Grains & Starches
                    - generic [ref=e101]: Safe
                  - generic [ref=e102]:
                    - img [ref=e103]
                    - paragraph [ref=e105]: A great source of carbohydrates and protein from the lentil filling. Eat fresh and in moderation.
                - generic [ref=e109]:
                  - generic [ref=e110]:
                    - generic [ref=e111]:
                      - img [ref=e113]
                      - heading "Dholl (Yellow Split Peas)" [level=4] [ref=e117]
                    - img [ref=e118]
                  - generic [ref=e121]:
                    - generic [ref=e122]: Protein
                    - generic [ref=e123]: Safe
                  - generic [ref=e124]:
                    - img [ref=e125]
                    - paragraph [ref=e127]: Excellent source of plant protein, iron, and folate. Perfect during pregnancy for baby's development.
                - generic [ref=e131]:
                  - generic [ref=e132]:
                    - generic [ref=e133]:
                      - img [ref=e135]
                      - generic [ref=e144]:
                        - heading "Roti / Farata" [level=4] [ref=e145]
                        - paragraph [ref=e146]: Farata
                    - img [ref=e147]
                  - generic [ref=e150]:
                    - generic [ref=e151]: Grains & Starches
                    - generic [ref=e152]: Safe
                  - generic [ref=e153]:
                    - img [ref=e154]
                    - paragraph [ref=e156]: Good source of energy. Wholemeal roti is even better for fibre. Pair with vegetables for a balanced meal.
                - generic [ref=e160]:
                  - generic [ref=e161]:
                    - generic [ref=e162]:
                      - img [ref=e164]
                      - heading "Riz (Rice)" [level=4] [ref=e174]
                    - img [ref=e175]
                  - generic [ref=e178]:
                    - generic [ref=e179]: Grains & Starches
                    - generic [ref=e180]: Safe
                  - generic [ref=e181]:
                    - img [ref=e182]
                    - paragraph [ref=e184]: Staple food and good energy source. Brown rice is preferred for higher fibre and nutrients.
                - generic [ref=e188]:
                  - generic [ref=e189]:
                    - generic [ref=e190]:
                      - img [ref=e192]
                      - generic [ref=e195]:
                        - heading "Bredes (Leafy Greens)" [level=4] [ref=e196]
                        - paragraph [ref=e197]: Bred mouroum, bred sonz
                    - img [ref=e198]
                  - generic [ref=e201]:
                    - generic [ref=e202]: Vegetable
                    - generic [ref=e203]: Safe
                  - generic [ref=e204]:
                    - img [ref=e205]
                    - paragraph [ref=e207]: Rich in iron, calcium, and vitamins. Bredes mouroum (moringa) is especially nutritious during pregnancy.
                - generic [ref=e211]:
                  - generic [ref=e212]:
                    - generic [ref=e213]:
                      - img [ref=e215]
                      - heading "Lentilles (Lentils)" [level=4] [ref=e219]
                    - img [ref=e220]
                  - generic [ref=e223]:
                    - generic [ref=e224]: Protein
                    - generic [ref=e225]: Safe
                  - generic [ref=e226]:
                    - img [ref=e227]
                    - paragraph [ref=e229]: Packed with folate, iron, and protein. Essential for preventing neural tube defects. Eat regularly!
                - generic [ref=e233]:
                  - generic [ref=e234]:
                    - generic [ref=e235]:
                      - img [ref=e237]
                      - heading "Papaye Mure (Ripe Papaya)" [level=4] [ref=e241]
                    - img [ref=e242]
                  - generic [ref=e245]:
                    - generic [ref=e246]: Fruit
                    - generic [ref=e247]: Safe
                  - generic [ref=e248]:
                    - img [ref=e249]
                    - paragraph [ref=e251]: Ripe papaya is safe and rich in vitamin C and folate. Only unripe/green papaya should be avoided.
                - generic [ref=e255]:
                  - generic [ref=e256]:
                    - generic [ref=e257]:
                      - img [ref=e259]
                      - generic [ref=e262]:
                        - heading "Banana" [level=4] [ref=e263]
                        - paragraph [ref=e264]: Fig
                    - img [ref=e265]
                  - generic [ref=e268]:
                    - generic [ref=e269]: Fruit
                    - generic [ref=e270]: Safe
                  - generic [ref=e271]:
                    - img [ref=e272]
                    - paragraph [ref=e274]: Great source of potassium, vitamin B6, and quick energy. Helps with morning sickness and leg cramps.
                - generic [ref=e278]:
                  - generic [ref=e279]:
                    - generic [ref=e280]:
                      - img [ref=e282]
                      - generic [ref=e284]:
                        - heading "Coconut Water" [level=4] [ref=e285]
                        - paragraph [ref=e286]: Dilo coco
                    - img [ref=e287]
                  - generic [ref=e290]:
                    - generic [ref=e291]: Drinks
                    - generic [ref=e292]: Safe
                  - generic [ref=e293]:
                    - img [ref=e294]
                    - paragraph [ref=e296]: Naturally hydrating with electrolytes. Excellent during Mauritius' hot weather. Helps reduce swelling.
                - generic [ref=e300]:
                  - generic [ref=e301]:
                    - generic [ref=e302]:
                      - img [ref=e304]
                      - heading "Lait (Pasteurised Milk)" [level=4] [ref=e307]
                    - img [ref=e308]
                  - generic [ref=e311]:
                    - generic [ref=e312]: Drinks
                    - generic [ref=e313]: Safe
                  - generic [ref=e314]:
                    - img [ref=e315]
                    - paragraph [ref=e317]: Good source of calcium and protein. Always use pasteurised milk. Essential for baby's bone development.
                - generic [ref=e321]:
                  - generic [ref=e322]:
                    - generic [ref=e323]:
                      - img [ref=e325]
                      - heading "Poisson Frais (Fresh Fish)" [level=4] [ref=e329]
                    - img [ref=e330]
                  - generic [ref=e333]:
                    - generic [ref=e334]: Protein
                    - generic [ref=e335]: Safe
                  - generic [ref=e336]:
                    - img [ref=e337]
                    - paragraph [ref=e339]: Excellent source of omega-3 and protein. Choose small fish like mackerel. Limit to 2-3 servings per week.
                - generic [ref=e343]:
                  - generic [ref=e344]:
                    - generic [ref=e345]:
                      - img [ref=e347]
                      - heading "Poulet (Chicken)" [level=4] [ref=e351]
                    - img [ref=e352]
                  - generic [ref=e355]:
                    - generic [ref=e356]: Protein
                    - generic [ref=e357]: Safe
                  - generic [ref=e358]:
                    - img [ref=e359]
                    - paragraph [ref=e361]: Lean protein source. Must be thoroughly cooked. Great in rougaille or grilled. Avoid undercooked chicken.
                - generic [ref=e365]:
                  - generic [ref=e366]:
                    - generic [ref=e367]:
                      - img [ref=e369]
                      - heading "Oeuf Bien Cuit (Well-cooked Egg)" [level=4] [ref=e373]
                    - img [ref=e374]
                  - generic [ref=e377]:
                    - generic [ref=e378]: Protein
                    - generic [ref=e379]: Safe
                  - generic [ref=e380]:
                    - img [ref=e381]
                    - paragraph [ref=e383]: Rich in choline for brain development. Always cook until both yolk and white are firm.
                - generic [ref=e387]:
                  - generic [ref=e388]:
                    - generic [ref=e389]:
                      - img [ref=e391]
                      - heading "Chatini Cotomili (Coriander Chutney)" [level=4] [ref=e394]
                    - img [ref=e395]
                  - generic [ref=e398]:
                    - generic [ref=e399]: Snacks & Street Food
                    - generic [ref=e400]: Safe
                  - generic [ref=e401]:
                    - img [ref=e402]
                    - paragraph [ref=e404]: Fresh coriander is safe and rich in vitamins. A nice accompaniment to meals in small quantities.
                - generic [ref=e408]:
                  - generic [ref=e409]:
                    - generic [ref=e410]:
                      - img [ref=e412]
                      - heading "Bouillon Bredes" [level=4] [ref=e416]
                    - img [ref=e417]
                  - generic [ref=e420]:
                    - generic [ref=e421]: Vegetable
                    - generic [ref=e422]: Safe
                  - generic [ref=e423]:
                    - img [ref=e424]
                    - paragraph [ref=e426]: Nutritious leafy green soup. Rich in vitamins and minerals. A comforting and healthy Mauritian dish.
                - generic [ref=e430]:
                  - generic [ref=e431]:
                    - generic [ref=e432]:
                      - img [ref=e434]
                      - heading "Fruit a Pain (Breadfruit)" [level=4] [ref=e438]
                    - img [ref=e439]
                  - generic [ref=e442]:
                    - generic [ref=e443]: Vegetable
                    - generic [ref=e444]: Safe
                  - generic [ref=e445]:
                    - img [ref=e446]
                    - paragraph [ref=e448]: Good source of fibre and potassium. Can be boiled, fried, or grilled. A Mauritian staple vegetable.
                - generic [ref=e452]:
                  - generic [ref=e453]:
                    - generic [ref=e454]:
                      - img [ref=e456]
                      - generic [ref=e465]:
                        - heading "Manioc Cuit (Cooked Cassava)" [level=4] [ref=e466]
                        - paragraph [ref=e467]: Manioc bouilli
                    - img [ref=e468]
                  - generic [ref=e471]:
                    - generic [ref=e472]: Grains & Starches
                    - generic [ref=e473]: Safe
                  - generic [ref=e474]:
                    - img [ref=e475]
                    - paragraph [ref=e477]: Good source of carbohydrates and energy. Must always be properly cooked. Never eat raw cassava.
            - generic [ref=e478]:
              - generic [ref=e479]:
                - img [ref=e480]
                - heading "With caution" [level=3] [ref=e482]
                - generic [ref=e483]: "10"
              - generic [ref=e484]:
                - generic [ref=e488]:
                  - generic [ref=e489]:
                    - generic [ref=e490]:
                      - img [ref=e492]
                      - heading "Mangue Vert (Green Mango)" [level=4] [ref=e496]
                    - img [ref=e497]
                  - generic [ref=e499]:
                    - generic [ref=e500]: Fruit
                    - generic [ref=e501]: With caution
                  - generic [ref=e502]:
                    - img [ref=e503]
                    - paragraph [ref=e505]: High acidity can cause heartburn. Eat in moderation. The salt and chilli condiment adds sodium — limit intake.
                - generic [ref=e509]:
                  - generic [ref=e510]:
                    - generic [ref=e511]:
                      - img [ref=e513]
                      - generic [ref=e516]:
                        - heading "Tamarind" [level=4] [ref=e517]
                        - paragraph [ref=e518]: Tamarin
                    - img [ref=e519]
                  - generic [ref=e521]:
                    - generic [ref=e522]: Fruit
                    - generic [ref=e523]: With caution
                  - generic [ref=e524]:
                    - img [ref=e525]
                    - paragraph [ref=e527]: High acidity may worsen heartburn. Small amounts in cooking are fine. Avoid eating large quantities as a snack.
                - generic [ref=e531]:
                  - generic [ref=e532]:
                    - generic [ref=e533]:
                      - img [ref=e535]
                      - heading "Piment (Hot Pepper)" [level=4] [ref=e539]
                    - img [ref=e540]
                  - generic [ref=e542]:
                    - generic [ref=e543]: Vegetable
                    - generic [ref=e544]: With caution
                  - generic [ref=e545]:
                    - img [ref=e546]
                    - paragraph [ref=e548]: Safe in small amounts but may worsen heartburn and indigestion, which are common in pregnancy. Use sparingly.
                - generic [ref=e552]:
                  - generic [ref=e553]:
                    - generic [ref=e554]:
                      - img [ref=e556]
                      - heading "Gato Pima (Chilli Cakes)" [level=4] [ref=e559]
                    - img [ref=e560]
                  - generic [ref=e562]:
                    - generic [ref=e563]: Snacks & Street Food
                    - generic [ref=e564]: With caution
                  - generic [ref=e565]:
                    - img [ref=e566]
                    - paragraph [ref=e568]: Deep fried and spicy. High in oil and sodium. Occasional treat is fine but avoid eating frequently.
                - generic [ref=e572]:
                  - generic [ref=e573]:
                    - generic [ref=e574]:
                      - img [ref=e576]
                      - heading "Mine Frite (Fried Noodles)" [level=4] [ref=e579]
                    - img [ref=e580]
                  - generic [ref=e582]:
                    - generic [ref=e583]: Snacks & Street Food
                    - generic [ref=e584]: With caution
                  - generic [ref=e585]:
                    - img [ref=e586]
                    - paragraph [ref=e588]: Often contains MSG and high sodium. Eat occasionally and prefer home-made versions with less oil and salt.
                - generic [ref=e592]:
                  - generic [ref=e593]:
                    - generic [ref=e594]:
                      - img [ref=e596]
                      - heading "Cafe (Coffee)" [level=4] [ref=e599]
                    - img [ref=e600]
                  - generic [ref=e602]:
                    - generic [ref=e603]: Drinks
                    - generic [ref=e604]: With caution
                  - generic [ref=e605]:
                    - img [ref=e606]
                    - paragraph [ref=e608]: Limit to 200mg caffeine per day (about 1-2 cups). Excess caffeine is linked to low birth weight. Try decaf.
                - generic [ref=e612]:
                  - generic [ref=e613]:
                    - generic [ref=e614]:
                      - img [ref=e616]
                      - heading "The Noir (Black Tea)" [level=4] [ref=e619]
                    - img [ref=e620]
                  - generic [ref=e622]:
                    - generic [ref=e623]: Drinks
                    - generic [ref=e624]: With caution
                  - generic [ref=e625]:
                    - img [ref=e626]
                    - paragraph [ref=e628]: Contains caffeine. 2-3 cups per day is generally fine. Avoid drinking with meals as it reduces iron absorption.
                - generic [ref=e632]:
                  - generic [ref=e633]:
                    - generic [ref=e634]:
                      - img [ref=e636]
                      - heading "Gato Patate (Sweet Potato Cake)" [level=4] [ref=e639]
                    - img [ref=e640]
                  - generic [ref=e642]:
                    - generic [ref=e643]: Snacks & Street Food
                    - generic [ref=e644]: With caution
                  - generic [ref=e645]:
                    - img [ref=e646]
                    - paragraph [ref=e648]: High in sugar but also nutritious from sweet potato. Enjoy as an occasional treat, not a daily snack.
                - generic [ref=e652]:
                  - generic [ref=e653]:
                    - generic [ref=e654]:
                      - img [ref=e656]
                      - heading "Rougaille Tomate (Spicy Tomato Sauce)" [level=4] [ref=e660]
                    - img [ref=e661]
                  - generic [ref=e663]:
                    - generic [ref=e664]: Vegetable
                    - generic [ref=e665]: With caution
                  - generic [ref=e666]:
                    - img [ref=e667]
                    - paragraph [ref=e669]: Generally safe but the acidity and spice may trigger heartburn. Use less chilli during pregnancy.
                - generic [ref=e673]:
                  - generic [ref=e674]:
                    - generic [ref=e675]:
                      - img [ref=e677]
                      - heading "Achard (Pickled Vegetables)" [level=4] [ref=e681]
                    - img [ref=e682]
                  - generic [ref=e684]:
                    - generic [ref=e685]: Vegetable
                    - generic [ref=e686]: With caution
                  - generic [ref=e687]:
                    - img [ref=e688]
                    - paragraph [ref=e690]: High in vinegar, oil, and mustard. Small portions as a side are fine. Avoid large quantities due to sodium.
            - generic [ref=e691]:
              - generic [ref=e692]:
                - img [ref=e693]
                - heading "Avoid" [level=3] [ref=e697]
                - generic [ref=e698]: "9"
              - generic [ref=e699]:
                - generic [ref=e703]:
                  - generic [ref=e704]:
                    - generic [ref=e705]:
                      - img [ref=e707]
                      - heading "Rougaille Saucisse (if undercooked)" [level=4] [ref=e711]
                    - img [ref=e712]
                  - generic [ref=e716]:
                    - generic [ref=e717]: Protein
                    - generic [ref=e718]: Avoid
                  - generic [ref=e719]:
                    - img [ref=e720]
                    - paragraph [ref=e722]: Processed sausage may contain listeria if not thoroughly cooked. Always ensure sausage is piping hot throughout.
                - generic [ref=e726]:
                  - generic [ref=e727]:
                    - generic [ref=e728]:
                      - img [ref=e730]
                      - heading "Vindaye with Excess Mustard Oil" [level=4] [ref=e734]
                    - img [ref=e735]
                  - generic [ref=e739]:
                    - generic [ref=e740]: Protein
                    - generic [ref=e741]: Avoid
                  - generic [ref=e742]:
                    - img [ref=e743]
                    - paragraph [ref=e745]: Excess mustard oil contains erucic acid which is harmful in large amounts. Small amounts in cooking are OK.
                - generic [ref=e749]:
                  - generic [ref=e750]:
                    - generic [ref=e751]:
                      - img [ref=e753]
                      - heading "Alouda (with Raw Milk)" [level=4] [ref=e756]
                    - img [ref=e757]
                  - generic [ref=e761]:
                    - generic [ref=e762]: Drinks
                    - generic [ref=e763]: Avoid
                  - generic [ref=e764]:
                    - img [ref=e765]
                    - paragraph [ref=e767]: Street alouda may use unpasteurised milk risking listeria and toxoplasmosis. Only drink from trusted sources using pasteurised milk.
                - generic [ref=e771]:
                  - generic [ref=e772]:
                    - generic [ref=e773]:
                      - img [ref=e775]
                      - heading "Rhum Arrange" [level=4] [ref=e778]
                    - img [ref=e779]
                  - generic [ref=e783]:
                    - generic [ref=e784]: Drinks
                    - generic [ref=e785]: Avoid
                  - generic [ref=e786]:
                    - img [ref=e787]
                    - paragraph [ref=e789]: All alcohol should be completely avoided during pregnancy. No safe level of alcohol consumption is known for pregnancy.
                - generic [ref=e793]:
                  - generic [ref=e794]:
                    - generic [ref=e795]:
                      - img [ref=e797]
                      - heading "Cervelle (Brain)" [level=4] [ref=e801]
                    - img [ref=e802]
                  - generic [ref=e806]:
                    - generic [ref=e807]: Protein
                    - generic [ref=e808]: Avoid
                  - generic [ref=e809]:
                    - img [ref=e810]
                    - paragraph [ref=e812]: May contain prions and high cholesterol. Risk of transmitting infections. Avoid completely during pregnancy.
                - generic [ref=e816]:
                  - generic [ref=e817]:
                    - generic [ref=e818]:
                      - img [ref=e820]
                      - heading "Raw Sashimi / Sushi" [level=4] [ref=e824]
                    - img [ref=e825]
                  - generic [ref=e829]:
                    - generic [ref=e830]: Protein
                    - generic [ref=e831]: Avoid
                  - generic [ref=e832]:
                    - img [ref=e833]
                    - paragraph [ref=e835]: Raw fish risks parasites, listeria, and mercury exposure. Only eat fully cooked fish during pregnancy.
                - generic [ref=e839]:
                  - generic [ref=e840]:
                    - generic [ref=e841]:
                      - img [ref=e843]
                      - heading "Papaye Verte (Green/Unripe Papaya)" [level=4] [ref=e847]
                    - img [ref=e848]
                  - generic [ref=e852]:
                    - generic [ref=e853]: Fruit
                    - generic [ref=e854]: Avoid
                  - generic [ref=e855]:
                    - img [ref=e856]
                    - paragraph [ref=e858]: Contains papain which may cause uterine contractions and is potentially harmful. Ripe papaya is safe.
                - generic [ref=e862]:
                  - generic [ref=e863]:
                    - generic [ref=e864]:
                      - img [ref=e866]
                      - heading "Beer / Phoenix Lager" [level=4] [ref=e869]
                    - img [ref=e870]
                  - generic [ref=e874]:
                    - generic [ref=e875]: Drinks
                    - generic [ref=e876]: Avoid
                  - generic [ref=e877]:
                    - img [ref=e878]
                    - paragraph [ref=e880]: All alcoholic beverages must be avoided during pregnancy. Try sparkling water with lime as an alternative.
                - generic [ref=e884]:
                  - generic [ref=e885]:
                    - generic [ref=e886]:
                      - img [ref=e888]
                      - heading "Street Boulettes (if not fresh)" [level=4] [ref=e891]
                    - img [ref=e892]
                  - generic [ref=e896]:
                    - generic [ref=e897]: Snacks & Street Food
                    - generic [ref=e898]: Avoid
                  - generic [ref=e899]:
                    - img [ref=e900]
                    - paragraph [ref=e902]: Street food kept at warm (not hot) temperatures risks bacterial growth. Only eat freshly steamed boulettes from hygienic sources.
  - contentinfo [ref=e903]:
    - generic [ref=e904]:
      - generic [ref=e905]:
        - generic [ref=e906]:
          - link "Manman Moris" [ref=e907] [cursor=pointer]:
            - /url: /en
            - img [ref=e909]
            - generic [ref=e911]: Manman Moris
          - paragraph [ref=e912]: The first all-in-one pregnancy platform for Mauritius.
        - generic [ref=e913]:
          - heading "Platform" [level=3] [ref=e914]
          - list [ref=e915]:
            - listitem [ref=e916]:
              - link "Tracker" [ref=e917] [cursor=pointer]:
                - /url: /en/tracker
            - listitem [ref=e918]:
              - link "Directory" [ref=e919] [cursor=pointer]:
                - /url: /en/directory
            - listitem [ref=e920]:
              - link "Emergency" [ref=e921] [cursor=pointer]:
                - /url: /en/emergency
            - listitem [ref=e922]:
              - link "Postpartum" [ref=e923] [cursor=pointer]:
                - /url: /en/postpartum
        - generic [ref=e924]:
          - heading "Community" [level=3] [ref=e925]
          - list [ref=e926]:
            - listitem [ref=e927]:
              - link "Community" [ref=e928] [cursor=pointer]:
                - /url: /en/forum
            - listitem [ref=e929]:
              - link "Benevolat" [ref=e930] [cursor=pointer]:
                - /url: /en/donate
            - listitem [ref=e931]:
              - link "Marketplace" [ref=e932] [cursor=pointer]:
                - /url: /en/marketplace
            - listitem [ref=e933]:
              - link "Blog" [ref=e934] [cursor=pointer]:
                - /url: /en/blog
        - generic [ref=e935]:
          - heading "Resources" [level=3] [ref=e936]
          - list [ref=e937]:
            - listitem [ref=e938]:
              - link "Food Guide" [ref=e939] [cursor=pointer]:
                - /url: /en/food-guide
            - listitem [ref=e940]:
              - link "Your Rights" [ref=e941] [cursor=pointer]:
                - /url: /en/rights
            - listitem [ref=e942]:
              - link "Contact" [ref=e943] [cursor=pointer]:
                - /url: /en/contact
      - generic [ref=e944]:
        - paragraph [ref=e945]: © 2026 Manman Moris. All rights reserved.
        - paragraph [ref=e946]:
          - text: Made with
          - img [ref=e947]
          - text: in Mauritius
  - button "Open Next.js Dev Tools" [ref=e954] [cursor=pointer]:
    - img [ref=e955]
  - alert [ref=e958]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Home page', () => {
  4  |   test('has hero section with CTA buttons', async ({ page }) => {
  5  |     await page.goto('/en');
  6  |     // Hero section exists with gradient heading
  7  |     await expect(page.locator('section').first()).toBeVisible();
  8  |     // CTA buttons should be present (register + directory)
  9  |     const buttons = page.locator('a[href*="/register"], a[href*="/directory"]');
  10 |     await expect(buttons.first()).toBeVisible();
  11 |   });
  12 | 
  13 |   test('has feature cards section', async ({ page }) => {
  14 |     await page.goto('/en');
  15 |     // Feature cards are rendered in a grid of Card components
  16 |     const cards = page.locator('[data-slot="card"]');
  17 |     // There should be feature cards (8 features defined in the page)
  18 |     await expect(cards.first()).toBeVisible();
  19 |   });
  20 | 
  21 |   test('has stats section', async ({ page }) => {
  22 |     await page.goto('/en');
  23 |     // Stats section contains specific numbers
  24 |     await expect(page.getByText('19,000+')).toBeVisible();
  25 |     await expect(page.getByText('50+')).toBeVisible();
  26 |     await expect(page.getByText('100%')).toBeVisible();
  27 |   });
  28 | 
  29 |   test('has sponsor section', async ({ page }) => {
  30 |     await page.goto('/en');
  31 |     // Sponsor names are displayed
  32 |     await expect(page.getByText('CityPharm')).toBeVisible();
  33 |     await expect(page.getByText('Apollo Bramwell')).toBeVisible();
  34 |   });
  35 | });
  36 | 
  37 | test.describe('Emergency page', () => {
  38 |   test('has hospital listings', async ({ page }) => {
  39 |     await page.goto('/en/emergency');
  40 |     // The emergency page contains hospital data
  41 |     await expect(page.getByText('Dr. A.G. Jeetoo Hospital')).toBeVisible();
  42 |     await expect(page.getByText('Victoria Hospital')).toBeVisible();
  43 |   });
  44 | 
  45 |   test('has emergency phone numbers', async ({ page }) => {
  46 |     await page.goto('/en/emergency');
  47 |     // Hospital phone numbers should be present
  48 |     await expect(page.getByText('+230 212 3201')).toBeVisible();
  49 |   });
  50 | });
  51 | 
  52 | test.describe('Food guide page', () => {
  53 |   test('has search input', async ({ page }) => {
  54 |     await page.goto('/en/food-guide');
  55 |     // The food guide page has a search/filter input
  56 |     const searchInput = page.locator('input[type="text"], input[type="search"]');
> 57 |     await expect(searchInput.first()).toBeVisible();
     |                                       ^ Error: expect(locator).toBeVisible() failed
  58 |   });
  59 | 
  60 |   test('has food items listed', async ({ page }) => {
  61 |     await page.goto('/en/food-guide');
  62 |     // Specific Mauritian foods should be visible
  63 |     await expect(page.getByText('Dal Puri')).toBeVisible();
  64 |     await expect(page.getByText('Roti / Farata')).toBeVisible();
  65 |   });
  66 | });
  67 | 
  68 | test.describe('Directory page', () => {
  69 |   test('has provider listings', async ({ page }) => {
  70 |     await page.goto('/en/directory');
  71 |     // Provider names should be visible
  72 |     await expect(page.getByText('Dr. Anisha Doorgakant')).toBeVisible();
  73 |     await expect(page.getByText('Marie-Claire Lamy')).toBeVisible();
  74 |   });
  75 | 
  76 |   test('has search functionality', async ({ page }) => {
  77 |     await page.goto('/en/directory');
  78 |     // Directory has a search input
  79 |     const searchInput = page.locator('input[type="text"], input[type="search"]');
  80 |     await expect(searchInput.first()).toBeVisible();
  81 |   });
  82 | });
  83 | 
```
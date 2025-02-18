describe("Strava", () => {
	it("Auto kudos", () => {
		// Visit Strava
		cy.visit("https://www.strava.com/login");

		// Login
		cy.url().should("include", "/login");
		cy.get('button[data-cy="accept-cookies"]').click();
		cy.get("#desktop-email").should("exist").type(Cypress.env("STRAVA_USERNAME"));  
		cy.wait(1000);
		cy.get("#desktop-login-button").should("exist").click();
		cy.wait(1000);
		cy.get('input[data-cy="password"]').eq(1).type(Cypress.env("STRAVA_PW"), { sensitive: true });
		cy.wait(1000);
		cy.get('button[type="submit"]').eq(1).click();
		cy.wait(1000);

		// Homepage
		cy.url().should("include", "/dashboard");

		// Kudos
		cy.scrollTo("bottom", { duration: 3000 }).then(() => {
			const unfillKudoButtonSelector = "[data-testid=unfilled_kudos]";
			const profileSelector = "[data-testid='avatar-wrapper']";
			cy.wait(1000);
			if (Cypress.$(unfillKudoButtonSelector).length > 0) {
				cy.get(profileSelector)
					.invoke("attr", "href")
					.then((profileHref) => {
						cy.get(unfillKudoButtonSelector).each(($el) => {
							cy.wrap($el)
								.closest("[data-testid=web-feed-entry]")
								.within(() => {
									cy.get('a[data-testid="owner-avatar"]')
										.invoke("attr", "href")
										.then((ownerHref) => {
											if (getAthleteId(ownerHref) !== getAthleteId(profileHref)) {
												cy.wrap($el).should("exist").click({ force: true });
											}
										});
								});
						});
					});
			}
		});
	});
});

const getAthleteId = (href) => href.split("/athletes/")[1];
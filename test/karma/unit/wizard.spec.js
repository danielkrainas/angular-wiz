(function() {
	describe('wizard', function() {
		beforeEach(module('angular-wiz', 'templates/step.html', 'templates/wizard.html'));
		
		var scope, elm;
		function titles() {
			return elm.find('ul').find('li');
		};
		
		
		describe('basics', function() {
			beforeEach(inject(function($compile, $rootScope) {
				scope = $rootScope.$new();
				
				elm = $compile([
					'<wizard>',
					'	<wizard-step title="first" active="true">',
					'	</wizard-step>',
					'</wizard>'
				].join('\n'))(scope);
				scope.$apply();
				return elm;
			}));
			
			it('should number steps', function() {
				var t = titles();
				expect(t.eq(0).find('span').text()).toBe('1');
			});
			
			it('should create titles', function() {
				var t = titles();
				expect(t.length).toBe(1);
				expect(t.eq(0).text()).toBe('1 first');
			});
		});
	});
}());
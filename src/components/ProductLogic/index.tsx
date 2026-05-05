import { products, type Category, type Gender } from '../../data/products';

export function ProductLogic() {
  const genders: Gender[] = ['Men', 'Women'];
  const menCategories: Category[] = ['Electric Shaver', 'Beard Trimmer', 'Multi Groomer', 'Body Groomer'];
  const womenCategories: Category[] = ['IPL Hair Removal', 'Facial Care'];

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-black text-gray-900 mb-2">Product Logic & Decision Tree</h2>
      <p className="text-gray-500 mb-8">Internal view: category tree, product counts per path, dead-end analysis</p>

      {/* Decision tree */}
      <div className="space-y-6">
        {genders.map(gender => {
          const categories = gender === 'Men' ? menCategories : womenCategories;
          const genderProducts = products.filter(p => p.gender === gender);

          return (
            <div key={gender} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
                <h3 className="font-bold">{gender === 'Men' ? 'Him' : 'Her'}</h3>
                <span className="text-sm text-gray-300">{genderProducts.length} products</span>
              </div>

              <div className="divide-y divide-gray-100">
                {categories.map(category => {
                  const catProducts = products.filter(p => p.category === category);
                  const tiers = [...new Set(catProducts.map(p => p.tier))];
                  const needsTier = !['Body Groomer', 'Facial Care', 'Beard Trimmer'].includes(category);

                  return (
                    <div key={category} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{category}</h4>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          catProducts.length === 1 ? 'bg-red-100 text-red-700' :
                          catProducts.length <= 2 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {catProducts.length} product{catProducts.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      {needsTier ? (
                        <div className="ml-4 space-y-1">
                          {tiers.map(tier => {
                            const tierProducts = catProducts.filter(p => p.tier === tier);
                            return (
                              <div key={tier} className="flex items-center gap-2 text-sm">
                                <span className="w-2 h-2 bg-gray-300 rounded-full" />
                                <span className="text-gray-600">{tier}</span>
                                <span className="text-gray-400">→</span>
                                <span className={`font-medium ${
                                  tierProducts.length === 1 ? 'text-red-600' : 'text-gray-900'
                                }`}>
                                  {tierProducts.length} product{tierProducts.length !== 1 ? 's' : ''}
                                </span>
                                {tierProducts.length === 1 && (
                                  <span className="text-xs text-red-500">(skip to result)</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="ml-4 text-sm text-gray-500">
                          {catProducts.length <= 2 ? (
                            <span className="text-yellow-600">Skip tier step → show all as results</span>
                          ) : (
                            <span className="text-red-600">Single product → skip to result + recovery UI</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dead-end analysis */}
      <div className="mt-8 border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3">Dead-End Analysis</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-gray-700">Body Groomer: 1 product — shows "You might also like" recovery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-gray-700">Multi Groomer Mid-Range & Entry: 1 product each — skip tier, show result + recovery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-gray-700">IPL Entry (Pro 3): 1 product — skip tier, show result + recovery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-700">All other paths: 2+ products — no dead ends</span>
          </div>
        </div>
      </div>

      {/* Path count */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <span className="font-bold text-gray-900">Total unique paths:</span> Gender (2) × Goal (varies) × Budget (3) = ~30 unique paths
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-bold text-gray-900">Dead-end risk:</span> Low. Only Body Groomer (1 product) is thin. All other paths return 2+ results.
        </p>
      </div>
    </div>
  );
}

import React from 'react'
import './filter.scss'
import { Collapse, Checkbox, Divider, Radio , Skeleton} from 'antd';
import { Minus, Plus } from '../../../icon/icons';



const filter = ({ filters, onFilterChange }) => {
  const { Panel } = Collapse;

  if (!filters || !filters.pricerange) {
      return (
          <div className='filter-main-container'>
            <div className='main-heading-filter'>
              <Skeleton.Input active style={{ width: 100 }} />
            </div>
            
            {[1, 2, 3].map((item) => (
              <React.Fragment key={item}>
                <div className='common-filters-list'>
                  <Collapse
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => (
                      <span className="custom-icon">
                        {isActive ? <Minus /> : <Plus />}
                      </span>
                    )}
                  >
                    <Panel 
                      header={
                        <Skeleton.Input 
                          active 
                          style={{ width: 150, height: 22 }} 
                        />
                      } 
                      key="1"
                    >
                      <div className='list-wrapper'>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} style={{ marginBottom: 8 }}>
                            <Skeleton.Input 
                              active 
                              style={{ width: '80%', height: 18 }} 
                            />
                          </div>
                        ))}
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        );
  }
  
  const filterGroups = [
    { 
      key: 'pricerange', 
      title: 'Price', 
      data: filters.pricerange 
    },
 
    { 
      key: 'shapes', 
      title: 'Shape', 
      data: filters.shapes 
    },
    { 
      key: 'weights', 
      title: 'Weight', 
      data: filters.weights 
    }
  ].filter(group => Array.isArray(group.data) && group.data.length > 0);

  return (
    <div className='filter-main-container'>
      <div className='main-heading-filter'>
        <h3>FILTER</h3>
      </div>
      
      {filterGroups.map((group, index) => (
        <React.Fragment key={group.key + index}>
          <div className='common-filters-list'>
            <Collapse
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <span className="custom-icon">
                  {isActive ? <Minus /> : <Plus />}
                </span>
              )}
            >
              <Panel header={group.title} key="1">
                <div className='list-wrapper'>
                  {group.data.map(item => (
                    <Checkbox
                      key={item.slug}
                      onChange={() => onFilterChange(group.key, item.slug)}
                    >
                      {item.title}
                    </Checkbox>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};

export default filter;
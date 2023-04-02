const ImageInfo = {
  // 이미지 정보 쿼리
  getImageInfoQuery: (uid) => `SELECT * FROM imageinfo where uid='${uid}'`,
  getSearchResult :(word) => `select id,uid,image_url,image_date,image_location,image_width,image_height,b.category_name
                              from ImageInfo a INNER JOIN ImageCategory b ON a.id = b.image_id 
                              INNER JOIN parent_category c on b.category_name = c.category_name 
                              where image_location like '%${word}%' or b.category_name like '%${word}%' or parent_name like '%${word}%';`,
  getSearchWordColorResult : (word,image_id) => `select id,uid,image_url,image_date,image_location,image_width,image_height,b.category_name,rgb_info
                                                from ImageInfo a INNER JOIN ImageCategory b ON a.id = b.image_id 
                                                INNER JOIN parent_category c on b.category_name = c.category_name 
                                                INNER JOIN (
                                                select image_id, json_arrayagg(json_object('red',r,'green',g,'blue',b,'type',rgb_type)) as rgb_info
                                                from palette
                                                group by palette.image_id) d on b.image_id = d.image_id
                                                where image_location like '%${word}%' 
                                                or b.category_name like '%${word}%'
                                                or parent_name like '%${word}%'
                                                or d.image_id in(${image_id});`,
  getSimilarColors : (minR,maxR,minG,maxG,minB,maxB) => `SELECT image_id FROM palette WHERE r BETWEEN ${minR} AND ${maxR} AND g BETWEEN ${minG} AND ${maxG} AND b BETWEEN ${minB} AND ${maxB}`
};

export default ImageInfo;

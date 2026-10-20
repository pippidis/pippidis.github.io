load mri D                                     
D = squeeze(D);                                
limits = [NaN NaN NaN NaN NaN 10];
[x, y, z, D] = subvolume(D, limits);           

[fo,vo] = isosurface(x,y,z,D,5);               
[fe,ve,ce] = isocaps(x,y,z,D,5);               

figure
p1 = patch('Faces', fo, 'Vertices', vo);       
p1.FaceColor = 'red';
p1.EdgeColor = 'none';

p2 = patch('Faces', fe, 'Vertices', ve, ...    
   'FaceVertexCData', ce);
p2.FaceColor = 'interp';
p2.EdgeColor = 'none';

view(-40,24)
daspect([1 1 0.3])                             
colormap(gray(100))
box on

camlight(40,40)                                
camlight(-20,-10)
lighting gouraud